import React from "react";
import logo from "../../data/img/logo-img.png";
import "./navigate.scss";
const Navigate = () => {
  return (
    <div>
      <div className="navigate">
        <img srcSet={`${logo} 2x`} alt="" className="navigate-logo" />
        <div className="navigate-main">
          <div className="navigate-item">
            <span className="navigate-item-text">Home</span>
            <span className="navigate-item-icon">
              <i className="fal fa-home"></i>
            </span>
          </div>
          <div className="navigate-item">
            <span className="navigate-item-text">Home</span>
            <span className="navigate-item-icon">
              <i className="fal fa-home"></i>
            </span>
          </div>
          <div className="navigate-item">
            <span className="navigate-item-text">Home</span>
            <span className="navigate-item-icon">
              <i className="fal fa-home"></i>
            </span>
          </div>
        </div>
        <div className="navigate-bottom">
          <div className="navigate-item">
            <span className="navigate-item-text">Home</span>
            <span className="navigate-item-icon">
              <i className="fal fa-home"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
