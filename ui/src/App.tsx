import React from "react";
import styled from "styled-components";
import ExpensesListContainer from "./ExpensesListContainer";

const Logo = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "BioRhyme Expanded", serif;
`;

const App = () => {
  return (
    <main>
      <Logo>💰 well spent 💰</Logo>
      <ExpensesListContainer />
    </main>
  );
};

export default App;
