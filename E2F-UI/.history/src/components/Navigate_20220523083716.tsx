import React from "react";
import logo from "../data/img/logo-img.png";
const Navigate = () => {
  return (
    <div>
      <div className="navigate">
        <img srcSet={logo} alt="" className="navigate-logo" />
        <div className="navigate-list">
          <div className="navigate-item">
            <span className="navigate-item-text">Home</span>
            <span className="navigate-item-icon">

            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
