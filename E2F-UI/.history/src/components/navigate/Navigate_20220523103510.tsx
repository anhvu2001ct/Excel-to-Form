import React from "react";
import logo from "../../data/img/logo-img.png";
import "./navigate.scss";
import NavigateMain from "./NavigateMain";
const Navigate = () => {
  return (
    <>
      <div className="navigate-container">
        <img srcSet={`${logo} 2x`} alt="" className="navigate-logo" />
        <NavigateMain />

      </div>
    </>
  );
};

export default Navigate;
