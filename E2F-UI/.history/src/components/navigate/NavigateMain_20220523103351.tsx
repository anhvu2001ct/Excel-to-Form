import React from "react";
import NavigateItem from "./NavigateItem";

const navigateItems = [
  {
    title: "Home",
    icon: "home",
    position: "left",
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
        return (
          <NavigateItem
            title={item.title}
            icon={item.icon}
            position={"right"}
          />
        );
      })}
    </div>
  );
};

export default NavigateMain;
