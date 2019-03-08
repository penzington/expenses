import React from "react";
import { useQuery } from "urql";
import gql from "graphql-tag";
import { GetExpensesQuery } from "./generated/types";

const getExpenses = gql`
  query GetExpenses($skip: Int!) {
    expenses(skip: $skip) {
      id
      comment
    }
  }
`;

const ExpensesList = ({ skip = 10 }) => {
  const [res] = useQuery<GetExpensesQuery>({
    query: getExpenses,
    variables: { skip }
  });

  if (res.fetching || res.data === undefined) {
    return <span>Loading...</span>;
  } else if (res.error) {
    return <span>Oh no!</span>;
  }

  return (
    <ul>
      {res.data.expenses.map(({ id }: { id: string }) => (
        <li key={id}>{id}</li>
      ))}
    </ul>
  );
};

const App = () => {
  return (
    <div>
      <ExpensesList skip={0} />
    </div>
  );
};

export default App;
