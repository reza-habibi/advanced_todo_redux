import React from "react";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import TodoReducer from "./Redux/TodoReducer/TodoReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(TodoReducer, composeWithDevTools());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
