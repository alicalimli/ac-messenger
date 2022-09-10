import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppContextProvider } from "setup/app-context-manager";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "features/authentication/reducers/user";

const store = configureStore({
  reducer: { userReducer },
});

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
