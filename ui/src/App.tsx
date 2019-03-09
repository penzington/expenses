import React from "react";
import { useQuery } from "urql";
import gql from "graphql-tag";
import { GetExpensesQuery } from "./generated/types";
import Uploader from "./Uploader";

const getExpenses = gql`
  query GetExpenses($skip: Int!) {
    expenses(skip: $skip) {
      count
      nodes {
        id
        comment
      }
    }
  }
`;

const PAGE_SIZE = 10;
const ExpensesList = () => {
  const [skip, setSkip] = React.useState(0);
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
    <>
      <ul>
        {res.data.expenses.nodes.map(({ id }: { id: string }) => (
          <li key={id}>
            {id} <Uploader id={id} />
          </li>
        ))}
      </ul>
      <button
        disabled={skip === 0}
        onClick={() => setSkip(skip => skip - PAGE_SIZE)}
      >
        Prev
      </button>
      <button
        disabled={skip + PAGE_SIZE >= res.data.expenses.count}
        onClick={() => setSkip(skip => skip + PAGE_SIZE)}
      >
        Next
      </button>
    </>
  );
};

const App = () => {
  return (
    <div>
      <ExpensesList />
    </div>
  );
};

export default App;
