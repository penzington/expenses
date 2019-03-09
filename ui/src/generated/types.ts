export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

export type GetExpensesVariables = {
  skip: number;
};

export type GetExpensesQuery = {
  __typename?: "Query";

  expenses: GetExpensesExpenses;
};

export type GetExpensesExpenses = {
  __typename?: "ExpensesPage";

  count: number;

  nodes: GetExpensesNodes[];
};

export type GetExpensesNodes = {
  __typename?: "Expense";

  id: string;

  comment: string;
};
