import React, { useRef } from "react";
import "./Notification.scss";
const Notification = () => {
  const nodeToast = useRef<HTMLHeadingElement>(null);
  const nodeProg = useRef<HTMLHeadingElement>(null);
  const nodeClose = useRef<HTMLHeadingElement>(null);
  let timer1: number, timer2;
  const handleClick = () => {
    nodeToast.current?.classList.add("active");
    nodeProg.current?.classList.add("active");
    timer1 = setTimeout(() => {
      nodeToast.current?.classList.remove("active");
    }, 5000);
    timer2 = setTimeout(() => {
      nodeToast.current?.classList.remove("active");
    }, 5300);
  };
  const handleClose = () => {
    nodeClose.current?.classList.remove("active");
    setTimeout(() => {
      nodeProg.current?.classList.remove("active");
    }, 3000);
    clearTimeout(timer1);
    clearTimeout(timer2);
  };
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
        <i
          className="fal fa-times close"
          ref={nodeClose}
          onClick={handleClose}
        ></i>
        <div className="progress" ref={nodeProg}></div>
      </div>
      <button className="btn-demo" onClick={handleClick}>
        Click me
      </button>
    </>
  );
};

export default Notification;
