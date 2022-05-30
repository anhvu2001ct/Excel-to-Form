import React from "react";

const navigateItems = [
  {
    title: "Home",
    icon: "home",
  },
  {
    title: "Dashboard",
    icon: "chart-line",
  },
  {
    title: "About",
    icon: "address-card",
  },
  {
    title: "Feedback",
    icon: "comment-alt",
  },
];
const NavigateMain = () => {
  return (
    <div className="navigate-main">
      {map }
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
