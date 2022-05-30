import React, { useRef } from "react";
import "./Notification.scss";
const Notification = () => {
  const nodeToast =
    useRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>();
  const handleClick = () => {};
  return (
    <>
      <div className="toast" ref={nodeToast}>
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
      <button className="btn-demo" onClick={handleClick}>
        Click me
      </button>
    </>
  );
};

export default Notification;
