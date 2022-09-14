import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "app/store";

import { Provider } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDuO49S8mFNa7uakoGfFwfips8k1DzFlqk",
  authDomain: "acmessenger-dda3f.firebaseapp.com",
  projectId: "acmessenger-dda3f",
  storageBucket: "acmessenger-dda3f.appspot.com",
  messagingSenderId: "166506161186",
  appId: "1:166506161186:web:4ef1be39e498cbd146167b",
  measurementId: "G-7K9MMLQQMS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = document.getElementById("root") as HTMLElement;

const AppMock = (): JSX.Element => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(React.createElement(AppMock), root);
