export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

export type GetExpensesVariables = {
  skip: number;
  first?: Maybe<number>;
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

  receipts: GetExpensesReceipts[];
};

export type GetExpensesReceipts = {
  __typename?: "Receipt";

  url: string;
};

export type CommentOnExpenseVariables = {
  id: string;
  comment: string;
};

export type CommentOnExpenseMutation = {
  __typename?: "Mutation";

  commentOnExpense: CommentOnExpenseCommentOnExpense;
};

export type CommentOnExpenseCommentOnExpense = {
  __typename?: "Expense";

  id: string;

  comment: string;
};
