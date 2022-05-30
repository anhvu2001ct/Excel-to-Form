import React from "react";
import logo from "../data/img/logo-img.png";
const Navigate = () => {
  return (
    <div>
      <div className="navigate">
        <img src={logo} alt="" className="navigate-logo" />
        <div className="navigate-list">
          <div className="navigate-item">
            <h3 className="navigate-item-text"></h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigate;
