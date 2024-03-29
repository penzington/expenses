import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Trans } from "@lingui/macro";
import { format } from "date-fns";
import {
  User as UserIcon,
  Hash as HashIcon,
  Calendar as CalendarIcon,
  ChevronsDown as ChevronsDownIcon,
  ChevronsUp as ChevronsUpIcon,
  Paperclip as PaperclipIcon,
  MessageSquare as MessageIcon
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
  padding-top: 1rem;
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
const DetailsElement = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  svg {
    margin-left: 0.2rem;
  }
`;
const DetailsButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 1rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #3490dc;
  display: flex;
  justify-content: center;
  align-items: center;
  &[disabled] {
    opacity: 0.5;
  }
`;

const shine = keyframes`
  0% {
    background-position: -100px;
  }
  40%, 100% {
    background-position: 230px;
  }
`;

const Text = styled.span<{ isSkeleton?: boolean }>`
  ${props =>
    props.isSkeleton &&
    css`
      color: transparent;
      opacity: 0.1;
      border-radius: 0.5rem;
      background-image: linear-gradient(
        90deg,
        #b8c2cc 0px,
        rgba(229, 229, 229, 0.8) 40px,
        #b8c2cc 80px
      );
      background-size: 600px;
      animation: ${shine} 2s infinite ease-out;
    `}
`;

const iconProps = {
  width: "1em",
  height: "1em",
  stroke: "#6CB2EB",
  strokeWidth: "1"
};

function ExpensesListItem({
  id,
  user,
  amount,
  merchant,
  date,
  receipts,
  comment,
  isSkeleton
}: ExpenseListItem & { isSkeleton?: boolean }) {
  const [showingDetails, setShowingDetails] = React.useState(false);
  return (
    <ExpenseListItemWrapper>
      <ContentWrapper>
        <PrimaryRow>
          <div>
            <UserIcon {...iconProps} />{" "}
            <Text isSkeleton={isSkeleton}>
              {user.first} {user.last}
            </Text>
          </div>
          <Amount>
            <div>
              <Text isSkeleton={isSkeleton}>
                <AmountValue>{amount.value}</AmountValue> {amount.currency}
              </Text>
            </div>{" "}
            <Text isSkeleton={isSkeleton}>
              <Trans>to {merchant}</Trans>
            </Text>
          </Amount>
        </PrimaryRow>
        <SecondaryRow>
          <div>
            <CalendarIcon {...iconProps} />{" "}
            <Text isSkeleton={isSkeleton}>
              {format(new Date(date), "MM/dd/yyyy HH:mm:ss")}
            </Text>
          </div>
          <div>
            <HashIcon {...iconProps} />{" "}
            <Text isSkeleton={isSkeleton}>
              <code>{id}</code>
            </Text>
          </div>
        </SecondaryRow>
      </ContentWrapper>
      <DetailsButton
        onClick={() => setShowingDetails(showingDetails => !showingDetails)}
        disabled={isSkeleton}
      >
        {showingDetails ? (
          <ChevronsUpIcon {...iconProps} width="1.5em" height="1.5em" />
        ) : (
          <ChevronsDownIcon {...iconProps} width="1.5em" height="1.5em" />
        )}
        <Trans>Details</Trans>
        {!!receipts.length && (
          <DetailsElement>
            {receipts.length} <PaperclipIcon {...iconProps} />{" "}
          </DetailsElement>
        )}
        {comment && (
          <DetailsElement>
            <MessageIcon {...iconProps} />
          </DetailsElement>
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
