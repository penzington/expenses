import React from "react";
import { GetExpenseExpense as Expense } from "./generated/types";
import Uploader from "./ReceiptUploader";

type ExpenseDetailsProps = {
  saveComment: (comment: string) => void;
  onUploadComplete: () => void;
  expense?: Expense;
  isLoading: boolean;
  hasFailed: boolean;
  hasFailedSaving: boolean;
};

function ExpenseDetails({
  saveComment,
  onUploadComplete,
  expense,
  isLoading,
  hasFailed
}: ExpenseDetailsProps) {
  if (isLoading || !expense) {
    return <span>Loading...</span>;
  }

  if (hasFailed) {
    return <span>Oh no!</span>;
  }

  return (
    <div>
      {expense.receipts.map(receipt => (
        <img
          src={`${process.env.REACT_APP_API_URL}${receipt.url}`}
          key={receipt.url}
        />
      ))}
      <Uploader id={expense.id} onUploadComplete={onUploadComplete} />
      <form
        onSubmit={e => {
          e.preventDefault();
          saveComment(e.currentTarget.comment.value);
        }}
      >
        <textarea name="comment" defaultValue={expense.comment} />
        <button type="submit">OK!</button>
      </form>
    </div>
  );
}

export default ExpenseDetails;
