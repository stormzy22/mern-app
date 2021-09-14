import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import App from "./App";
import dotenv from "dotenv";
import "./index.css";
dotenv.config({});
axios.defaults.baseURL = "http://localhost:8000/api/v3";

const strore = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={strore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
