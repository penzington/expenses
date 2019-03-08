export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

export type GetExpensesVariables = {
  skip: number;
};

export type GetExpensesQuery = {
  __typename?: "Query";

  expenses: GetExpensesExpenses[];
};

export type GetExpensesExpenses = {
  __typename?: "Expense";

  id: string;

  comment: string;
};
