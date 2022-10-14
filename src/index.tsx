import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "setup/store";

import { Provider } from "react-redux";
import ErrorBoundary from "pages/ErrorBoundary";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const root = document.getElementById("root") as HTMLElement;

let persistor = persistStore(store);

const AppMock = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
      <PersistGate persistor={persistor}>

        <App />
      </PersistGate>
      </ErrorBoundary>
    </Provider>
  );
};

ReactDOM.render(React.createElement(AppMock), root);
