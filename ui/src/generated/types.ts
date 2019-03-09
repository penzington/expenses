export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

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

export type GetExpenseVariables = {
  id: string;
};

export type GetExpenseQuery = {
  __typename?: "Query";

  expense: Maybe<GetExpenseExpense>;
};

export type GetExpenseExpense = {
  __typename?: "Expense";

  id: string;

  user: GetExpenseUser;

  comment: string;

  receipts: GetExpenseReceipts[];
};

export type GetExpenseUser = {
  __typename?: "User";

  first: string;

  last: string;

  email: string;
};

export type GetExpenseReceipts = {
  __typename?: "Receipt";

  url: string;
};

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

  user: GetExpensesUser;

  amount: GetExpensesAmount;

  merchant: string;

  date: string;
};

export type GetExpensesUser = {
  __typename?: "User";

  first: string;

  last: string;
};

export type GetExpensesAmount = {
  __typename?: "Amount";

  value: string;

  currency: string;
};
