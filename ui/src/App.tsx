import React, { Component } from "react";
import { useQuery } from "urql";
import logo from "./logo.svg";
import "./App.css";

const getExpenses = `
  query GetExpenses($skip: Int!) {
    expenses(skip: $skip) {
      id
      comment
    }
  }
`;

const ExpensesList = ({ skip = 10 }) => {
  const [res] = useQuery({
    query: getExpenses,
    variables: { skip }
  });

  if (res.fetching || res.data === undefined) {
    return <span>Loading...</span>;
  } else if (res.error) {
    return <span>Oh no!</span>;
  }

  return (
    <ul>
      {res.data.expenses.map(({ id }: { id: string }) => (
        <li key={id}>{id}</li>
      ))}
    </ul>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <ExpensesList skip={0} />
        </header>
      </div>
    );
  }
}

export default App;
