import React from "react";
import { createPortal } from "react-dom";

const Toast = ({ children }) => {
  return createPortal(
    <div className="bg-white mt-4 fixed top-0 left-1/2 -translate-x-1/2 flex items-center justify-center z-10 shadow-md p-4 px-8 rounded-xl"> {children} </div>,
    document.getElementById("toast")
  );
};

export default Toast;
