import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppContextProvider } from "setup/app-context-manager";
import { Provider } from "react-redux";
import { store } from "store";

const root = document.getElementById("root") as HTMLElement;

const AppMock = (): JSX.Element => {
  return (
    <AppContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContextProvider>
  );
};

ReactDOM.render(React.createElement(AppMock), root);
