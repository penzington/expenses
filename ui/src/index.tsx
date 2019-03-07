import React from "react";
import ReactDOM from "react-dom";
import { Provider, createClient } from "urql";
import App from "./App";
import "./index.css";

const client = createClient({
  url: "http://localhost:8000/graphql"
});

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
