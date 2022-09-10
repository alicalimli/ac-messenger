import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppContextProvider } from "setup/app-context-manager";

const root = document.getElementById("root") as HTMLElement;

const AppMock = (): JSX.Element => {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};

ReactDOM.render(React.createElement(AppMock), root);
