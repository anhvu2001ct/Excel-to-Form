import React from "react";
import logo from "../../data/img/logo-img.png";
import "./navigate.scss";
import NavigateBottom from "./NavigateBottom";
import NavigateMain from "./NavigateMain";
const Navigate = () => {
  return (
    <>
      <div className="navigate-container">
        <img srcSet={`${logo} 2x`} alt="" className="navigate-logo" />
        <NavigateMain />
        <NavigateBottom />
      </div>
    </>
  );
};

export default Navigate;
