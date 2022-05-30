import React from "react";

const navigateItems = [
  {
    title: "Home",
    icon: "home",
  },
];
const NavigateMain = () => {
  return (
    <div className="navigate-main">
      <div className="navigate-item">
        <span className="navigate-item-text">Home</span>
        <span className="navigate-item-icon">
          <i className="fal fa-home"></i>
        </span>
      </div>
    </div>
  );
};

export default NavigateMain;
