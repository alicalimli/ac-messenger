import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "store";

const root = document.getElementById("root") as HTMLElement;

const AppMock = (): JSX.Element => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(React.createElement(AppMock), root);
