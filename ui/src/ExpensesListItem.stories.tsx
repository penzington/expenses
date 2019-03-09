import React from "react";
import { storiesOf } from "@storybook/react";
import ExpensesListItem from "./ExpensesListItem";

const props = {
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

storiesOf("ExpensesListItem", module)
  .add("default", () => <ExpensesListItem {...props} />)
  .add("skeleton", () => <ExpensesListItem {...props} isSkeleton />);
