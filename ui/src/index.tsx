import React from "react";
import ReactDOM from "react-dom";
import { Provider, createClient } from "urql";
import App from "./App";
import "./index.css";

const apiUrl = process.env.REACT_APP_GRAPHQL_URL;
if (!apiUrl) {
  throw new Error("Missing API url!");
}

const client = createClient({ url: apiUrl });

ReactDOM.render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById("root")
);
