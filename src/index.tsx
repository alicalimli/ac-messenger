import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "setup/store";

import { Provider } from "react-redux";
import ErrorBoundary from "ErrorBoundary";

const root = document.getElementById("root") as HTMLElement;

const AppMock = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
};

ReactDOM.render(React.createElement(AppMock), root);
