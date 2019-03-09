import React from "react";
import { useQuery } from "urql";
import gql from "graphql-tag";

import { GetExpensesQuery, GetExpensesVariables } from "./generated/types";
import ExpensesList from "./ExpensesList";

const getExpensesQuery = gql`
  query GetExpenses($skip: Int!, $first: Int) {
    expenses(skip: $skip, first: $first) {
      count
      nodes {
        id
        user {
          first
          last
        }
        amount {
          value
          currency
        }
        merchant
        date
      }
    }
  }
`;

const PAGE_SIZE = 10;

function ExpensesListContainer() {
  const [skip, setSkip] = React.useState(0);
  const [res] = useQuery<GetExpensesQuery, GetExpensesVariables>({
    query: getExpensesQuery,
    variables: { skip, first: PAGE_SIZE }
  });

  return (
    <ExpensesList
      expenses={!!res.data ? res.data.expenses.nodes : []}
      hasNextPage={!!res.data && skip + PAGE_SIZE < res.data.expenses.count}
      hasPrevPage={skip > 0}
      getNextPage={() => setSkip(skip => skip + PAGE_SIZE)}
      getPrevPage={() => setSkip(skip => skip - PAGE_SIZE)}
      hasFailed={!!res.error}
      isLoading={res.fetching || res.data === undefined}
    />
  );
}

export default ExpensesListContainer;
