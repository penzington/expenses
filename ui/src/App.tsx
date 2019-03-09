import React from "react";
import { useQuery, useMutation } from "urql";
import gql from "graphql-tag";
import {
  GetExpensesQuery as GetExpensesQueryResponse,
  GetExpensesVariables,
  CommentOnExpenseVariables,
  CommentOnExpenseMutation
} from "./generated/types";
import Uploader from "./Uploader";

const getExpensesQuery = gql`
  query GetExpenses($skip: Int!, $first: Int) {
    expenses(skip: $skip, first: $first) {
      count
      nodes {
        id
        comment
      }
    }
  }
`;

const commentOnExpenseMutation = gql`
  mutation CommentOnExpense($id: ID!, $comment: String!) {
    commentOnExpense(id: $id, comment: $comment) {
      id
      comment
    }
  }
`;

function ExpenseComment({ id }: { id: string }) {
  const [res, executeMutation] = useMutation<
    CommentOnExpenseMutation,
    CommentOnExpenseVariables
  >(commentOnExpenseMutation);

  if (res.error) {
    return <span>Oh no!</span>;
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        executeMutation({ comment: e.currentTarget.comment.value, id });
      }}
    >
      <textarea name="comment" />
      <button type="submit">OK!</button>
    </form>
  );
}

const PAGE_SIZE = 10;
const ExpensesList = () => {
  const [skip, setSkip] = React.useState(0);
  const [res] = useQuery<GetExpensesQueryResponse, GetExpensesVariables>({
    query: getExpensesQuery,
    variables: { skip, first: PAGE_SIZE }
  });

  if (res.fetching || res.data === undefined) {
    return <span>Loading...</span>;
  } else if (res.error) {
    return <span>Oh no!</span>;
  }

  return (
    <>
      <ul>
        {res.data.expenses.nodes.map(({ id, comment }) => (
          <li key={id}>
            {id}: {comment}
            <Uploader id={id} /> <ExpenseComment id={id} />
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
