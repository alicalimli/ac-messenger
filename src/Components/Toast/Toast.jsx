import React from "react";
import { createPortal } from "react-dom";

const Toast = ({ children }) => {
  return createPortal(
    <div className="bg-white fixed top-0 left-1/2 -translate-x-1/2 flex items-center justify-center z-10 shadow-md"> {children} </div>,
    document.getElementById("toast")
  );
};

export default Toast;
