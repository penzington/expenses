import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ExpensesList from "./ExpensesList";

const expense = {
  id: "5b996064dfd5b783915112f5",
  user: {
    first: "Maciej",
    last: "Smith"
  },
  amount: {
    value: "10.99",
    currency: "DKK"
  },
  merchant: "Apple Inc.",
  date: "2018-09-10T02:11:29.184Z",
  receipts: [],
  comment: ""
};

const props = {
  pageSize: 3,
  hasNextPage: false,
  hasPrevPage: true,
  getNextPage: action("getNextPage"),
  getPrevPage: action("getPrevPage"),
  onRetry: action("onRetry"),
  expenses: [],
  isLoading: true,
  hasFailed: false
};

storiesOf("ExpensesList", module)
  .add("loading", () => <ExpensesList {...props} />)
  .add("failed", () => <ExpensesList {...props} hasFailed />)
  .add("loaded", () => (
    <ExpensesList
      {...props}
      isLoading={false}
      expenses={[expense, { id: "b", ...expense }, { id: "c", ...expense }]}
    />
  ));
