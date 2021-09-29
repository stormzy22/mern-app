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
axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;
axios.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
  }
  return req;
});
const strore = createStore(reducers, compose(applyMiddleware(thunk)));
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

ReactDOM.render(
  <Provider store={strore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
