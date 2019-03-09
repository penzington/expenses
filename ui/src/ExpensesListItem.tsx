import React from "react";
import { GetExpensesNodes as ExpenseListItem } from "./generated/types";
import ExpenseDetails from "./ExpenseDetailsContainer";

function ExpensesListItem({
  id,
  user,
  amount,
  merchant,
  date
}: ExpenseListItem) {
  const [showingDetails, setShowingDetails] = React.useState(false);
  return (
    <li>
      <div>
        {user.first} {user.last}
      </div>
      <div>
        {amount.value} {amount.currency} from {merchant}
      </div>
      <div>{date}</div>
      <div>{id}</div>
      <button
        onClick={() => setShowingDetails(showingDetails => !showingDetails)}
      >
        {showingDetails ? "Hide Details" : "Show Details"}
      </button>
      {showingDetails && <ExpenseDetails id={id} />}
    </li>
  );
}

export default ExpensesListItem;
