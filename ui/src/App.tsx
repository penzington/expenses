import React from "react";
import styled from "styled-components";
import { I18nProvider } from "@lingui/react";
import catalogPl from "./locales/pl/messages.js";
import ExpensesListContainer from "./ExpensesListContainer";

const Logo = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "BioRhyme Expanded", serif;
`;
const LanguageSwitch = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  @media (max-width: 800px) {
    position: initial;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const LanguageButton = styled.button`
  background: none;
  border: none;
  font-size: 0.9rem;
  font-family: inherit;
  padding: 0.5rem;
  margin: 0.2rem;
  &[disabled] {
    opacity: 0.5;
  }
`;

const App = () => {
  const [language, setLanguage] = React.useState("en");
  return (
    <I18nProvider language={language} catalogs={{ pl: catalogPl }}>
      <main>
        <Logo>💰 well spent 💰</Logo>
        <LanguageSwitch>
          <LanguageButton
            disabled={language === "pl"}
            onClick={() => setLanguage("pl")}
          >
            PL 🇵🇱
          </LanguageButton>
          <LanguageButton
            disabled={language === "en"}
            onClick={() => setLanguage("en")}
          >
            EN 🇬🇧
          </LanguageButton>
        </LanguageSwitch>
        <ExpensesListContainer />
      </main>
    </I18nProvider>
  );
};

export default App;
