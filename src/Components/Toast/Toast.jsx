import React from "react";
import { createPortal } from "react-dom";

const Toast = ({ children }) => {
  return createPortal(
    <div className="toast-container"> {children} </div>,
    document.getElementById("toast")
  );
};

export default Toast;
