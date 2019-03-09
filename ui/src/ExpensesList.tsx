import React from "react";
import styled from "styled-components";
import { AlertTriangle as AlertIcon } from "react-feather";
import { GetExpensesNodes as ExpenseListItem } from "./generated/types";
import ExpensesListItem from "./ExpensesListItem";
import Button from "./Button";

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  & > * + * {
    margin-left: 1rem;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
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

const RetryButton = styled(Button)`
  margin-left: 1rem;
`;

type ExpensesListProps = {
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  getNextPage: () => void;
  getPrevPage: () => void;
  onRetry: () => void;
  expenses: ExpenseListItem[];
  isLoading: boolean;
  hasFailed: boolean;
};

function ExpensesList({
  pageSize,
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
  onRetry,
  expenses,
  isLoading,
  hasFailed
}: ExpensesListProps) {
  if (hasFailed) {
    return (
      <Failed>
        <AlertIcon /> Failed to load expenses.
        <RetryButton onClick={onRetry}>Try again</RetryButton>
      </Failed>
    );
  }

  if (isLoading) {
    expenses = Array.from(Array(pageSize).keys()).map(index => ({
      id: index.toString(),
      user: {
        first: "x".repeat(8),
        last: "x".repeat(12)
      },
      amount: {
        value: "x".repeat(5),
        currency: "x".repeat(3)
      },
      merchant: "x".repeat(10),
      date: "2018-09-10T02:11:29.184Z"
    }));
  }

  const ControlButtons = (
    <Controls>
      <Button disabled={!hasPrevPage} onClick={getPrevPage}>
        Prev Page
      </Button>
      <Button disabled={!hasNextPage} onClick={getNextPage}>
        Next Page
      </Button>
    </Controls>
  );

  return (
    <div>
      {ControlButtons}
      <List>
        {expenses.map(expense => (
          <ExpensesListItem
            {...expense}
            key={expense.id}
            isSkeleton={isLoading}
          />
        ))}
      </List>
      {ControlButtons}
    </div>
  );
}

export default ExpensesList;
