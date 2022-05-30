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
      {navigateItems.map((item) => {
        return <navigateItems></navigateItems>;
      })}
    </div>
  );
};

export default NavigateMain;
