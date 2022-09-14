import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "app/store";

import { Provider } from "react-redux";

const root = document.getElementById("root") as HTMLElement;

const AppMock = (): JSX.Element => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(React.createElement(AppMock), root);
