import React from "react";
import styled, { css } from "styled-components";
import { format } from "date-fns";
import {
  User as UserIcon,
  Hash as HashIcon,
  Calendar as CalendarIcon,
  ChevronsDown as ChevronsDownIcon,
  ChevronsUp as ChevronsUpIcon
} from "react-feather";
import { GetExpensesNodes as ExpenseListItem } from "./generated/types";
import ExpenseDetails from "./ExpenseDetailsContainer";

const ExpenseListItemWrapper = styled.li`
  list-style: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  transition: all 200ms ease-in-out;
  border-radius: 1rem;
  background-color: #f8fafc;
  max-width: 35rem;
  margin: 1rem auto;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  }
`;
const ContentWrapper = styled.div`
  padding: 2rem;
  padding-bottom: 0;
`;
const DetailsWrapper = styled.div`
  padding: 2rem;
  padding-top: 0;
`;
const SecondaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #757575;
`;
const PrimaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;
const AmountValue = styled.code`
  font-size: 1.4rem;
`;
const Amount = styled.div`
  text-align: right;
`;
const DetailsButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #3490dc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const iconProps = {
  width: "1em",
  height: "1em",
  stroke: "currentColor",
  strokeWidth: "1"
};

function ExpensesListItem({
  id,
  user,
  amount,
  merchant,
  date
}: ExpenseListItem) {
  const [showingDetails, setShowingDetails] = React.useState(false);
  return (
    <ExpenseListItemWrapper>
      <ContentWrapper>
        <PrimaryRow>
          <div>
            <UserIcon {...iconProps} /> {user.first} {user.last}
          </div>
          <Amount>
            <div>
              <AmountValue>{amount.value}</AmountValue> {amount.currency}
            </div>{" "}
            to {merchant}
          </Amount>
        </PrimaryRow>
        <SecondaryRow>
          <div>
            <CalendarIcon {...iconProps} />{" "}
            {format(new Date(date), "MM/dd/yyyy HH:mm:ss")}
          </div>
          <div>
            <HashIcon {...iconProps} /> <code>{id}</code>
          </div>
        </SecondaryRow>
      </ContentWrapper>
      <DetailsButton
        onClick={() => setShowingDetails(showingDetails => !showingDetails)}
      >
        Details
        {showingDetails ? (
          <ChevronsUpIcon {...iconProps} width="1.5em" height="1.5em" />
        ) : (
          <ChevronsDownIcon {...iconProps} width="1.5em" height="1.5em" />
        )}
      </DetailsButton>
      {showingDetails && (
        <DetailsWrapper>
          <ExpenseDetails id={id} />
        </DetailsWrapper>
      )}
    </ExpenseListItemWrapper>
  );
}

export default ExpensesListItem;
