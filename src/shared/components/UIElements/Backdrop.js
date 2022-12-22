import React from "react";
import ReactDom from "react-dom";

import "./Backdrop.css";

const Backdrop = (props) => {
  const content = <div className="backdrop" onClick={props.onClick}></div>;
  const container = document.getElementById("backdrop-hook");

  return ReactDom.createPortal(content, container);
};

export default Backdrop;
