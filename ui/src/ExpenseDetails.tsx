import React from "react";
import styled, { keyframes } from "styled-components";
import { Trans } from "@lingui/macro";
import {
  Loader as LoaderIcon,
  AlertTriangle as AlertIcon
} from "react-feather";
import { GetExpenseExpense as Expense } from "./generated/types";
import Uploader from "./ReceiptUploader";
import Button from "./Button";

const LabelText = styled.div`
  margin: 0.5rem 0;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CommentInput = styled.textarea`
  border: 1px solid #dae1e7;
  background: white;
  border-radius: 1rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.3rem;
  font-family: inherit;
  color: inherit;
  min-height: 5rem;
  margin-bottom: 0.5rem;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  animation: ${rotate} 2s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;
`;

const Failed = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;
  svg {
    margin-right: 1rem;
  }
`;

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
  hasFailed,
  hasFailedSaving
}: ExpenseDetailsProps) {
  const [comment, setComment] = React.useState(expense ? expense.comment : "");

  if (isLoading || !expense) {
    return (
      <Loader>
        <LoaderIcon />
      </Loader>
    );
  }

  if (hasFailed) {
    return (
      <Failed>
        <AlertIcon /> <Trans>Failed to load details</Trans>
      </Failed>
    );
  }

  return (
    <div>
      <LabelText>
        <Trans>Receipts</Trans>
      </LabelText>
      <Uploader
        id={expense.id}
        onUploadComplete={onUploadComplete}
        uploaded={expense.receipts}
      />

      <form
        onSubmit={e => {
          e.preventDefault();
          saveComment(comment);
        }}
      >
        <label>
          <LabelText>
            <Trans>Comment</Trans>
          </LabelText>
          <CommentInput
            name="comment"
            defaultValue={expense.comment}
            onChange={e => setComment(e.target.value)}
          />
        </label>
        <Button type="submit" disabled={comment === expense.comment}>
          <Trans>Save Comment</Trans>
        </Button>
        {hasFailedSaving && (
          <p>
            <Trans>Saving comment failed! Please, try again</Trans>
          </p>
        )}
      </form>
    </div>
  );
}

export default ExpenseDetails;
