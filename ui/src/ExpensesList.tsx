import React from "react";
import styled from "styled-components";
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

type ExpensesListProps = {
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  getNextPage: () => void;
  getPrevPage: () => void;
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
  expenses,
  isLoading,
  hasFailed
}: ExpensesListProps) {
  if (hasFailed) {
    return <span>Oh no!</span>;
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
