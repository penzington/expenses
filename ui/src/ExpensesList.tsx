import React from "react";
import { GetExpensesNodes as ExpenseListItem } from "./generated/types";
import ExpensesListItem from "./ExpensesListItem";

type ExpensesListProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  getNextPage: () => void;
  getPrevPage: () => void;
  expenses: ExpenseListItem[];
  isLoading: boolean;
  hasFailed: boolean;
};

function ExpensesList({
  hasNextPage,
  hasPrevPage,
  getNextPage,
  getPrevPage,
  expenses,
  isLoading,
  hasFailed
}: ExpensesListProps) {
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (hasFailed) {
    return <span>Oh no!</span>;
  }

  return (
    <div>
      <ul>
        {expenses.map(expense => (
          <ExpensesListItem {...expense} key={expense.id} />
        ))}
      </ul>
      <button disabled={!hasPrevPage} onClick={getPrevPage}>
        Prev
      </button>
      <button disabled={!hasNextPage} onClick={getNextPage}>
        Next
      </button>
    </div>
  );
}

export default ExpensesList;
