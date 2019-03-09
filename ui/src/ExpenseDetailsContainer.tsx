import React from "react";
import { useMutation, useQuery } from "urql";
import gql from "graphql-tag";
import {
  CommentOnExpenseVariables,
  CommentOnExpenseMutation,
  GetExpenseQuery,
  GetExpenseVariables
} from "./generated/types";
import ExpenseDetails from "./ExpenseDetails";

const commentOnExpenseMutation = gql`
  mutation CommentOnExpense($id: ID!, $comment: String!) {
    commentOnExpense(id: $id, comment: $comment) {
      id
      comment
    }
  }
`;

const getExpenseQuery = gql`
  query GetExpense($id: ID!) {
    expense(id: $id) {
      id
      user {
        first
        last
        email
      }
      comment
      receipts {
        url
      }
    }
  }
`;

function ExpenseDetailsContainer({ id }: { id: string }) {
  const [mutationRes, saveComment] = useMutation<
    CommentOnExpenseMutation,
    CommentOnExpenseVariables
  >(commentOnExpenseMutation);

  const [queryRes, refetchExpense] = useQuery<
    GetExpenseQuery,
    GetExpenseVariables
  >({
    query: getExpenseQuery,
    variables: { id }
  });

  return (
    <ExpenseDetails
      isLoading={queryRes.fetching || queryRes.data === undefined}
      hasFailed={!!queryRes.error}
      onUploadComplete={() => refetchExpense({ requestPolicy: "network-only" })}
      hasFailedSaving={!!mutationRes.error}
      saveComment={comment => saveComment({ comment, id })}
      expense={
        queryRes.data && queryRes.data.expense
          ? queryRes.data.expense
          : undefined
      }
    />
  );
}

export default ExpenseDetailsContainer;
