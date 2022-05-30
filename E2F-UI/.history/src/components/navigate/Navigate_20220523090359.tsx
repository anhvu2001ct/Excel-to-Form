import React from "react";
import logo from "../../data/img/logo-img.png";
import "./navigate.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Navigate = () => {
  return (
    <div>
      <div className="navigate">
        <img srcSet={`${logo} 2x`} alt="" className="navigate-logo" />
        <div className="navigate-list">
          <div className="navigate-item">
            <span className="navigate-item-text">Home</span>
            <span className="navigate-item-icon">
              <FontAwesomeIcon icon={["fas", "coffee"]} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
