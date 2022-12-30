import React from "react";
import ReactDom from "react-dom";

import "./Backdrop.css";

const Backdrop = (props) => {
  const content = <div className="backdrop" onClick={props.onClick}></div>;

  return ReactDom.createPortal(
    content,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
