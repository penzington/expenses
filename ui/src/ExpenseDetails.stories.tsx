import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ExpenseDetails from "./ExpenseDetails";

const props = {
  saveComment: action("saveComment"),
  onUploadComplete: action("onUploadComplete"),
  expense: {
    id: "5b996064dfd5b783915112f5",
    user: {
      first: "Maciej",
      last: "Smith",
      email: "hello@example.com"
    },
    comment: "Hello!",
    receipts: []
  },
  isLoading: false,
  hasFailed: false,
  hasFailedSaving: false
};

storiesOf("ExpenseDetails", module)
  .add("default", () => <ExpenseDetails {...props} />)
  .add("with receipts", () => (
    <ExpenseDetails
      {...props}
      expense={{ ...props.expense, receipts: [{ url: "/receipts/1.jpg" }] }}
    />
  ))
  .add("loading", () => <ExpenseDetails {...props} isLoading />)
  .add("failed", () => <ExpenseDetails {...props} hasFailed />)
  .add("failed saving", () => <ExpenseDetails {...props} hasFailedSaving />);
