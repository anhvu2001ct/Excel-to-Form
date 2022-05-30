import React from "react";
import "./Notification.scss";
const Notification = () => {
  return (
    <div className="toast">
      <div className="toast-content">
        <i className="fas fa-solid fa-check check"></i>
        <div className="message">
          <span className="text text-1">Success</span>
          <span className="text text-2">Your changes has been saved</span>
        </div>
      </div>
      <i className="fal fa-times close"></i>
      <div className="progress"></div>
    </div>
  );
};

export default Notification;
