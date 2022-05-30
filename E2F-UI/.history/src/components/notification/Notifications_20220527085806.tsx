import React, { useRef, useState } from "react";
import "./Notification.scss";
type Props = {
  type: "error" | "success" | "warning";
  message: string;
};

type NotiListProps = {
  [key: string]: Props;
};

let add: (type: Props["type"], message: Props["message"]) => void;

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotiListProps>({});

  const counter = useRef(0);
  add = (type: Props["type"], message: Props["message"]) => {
    let id = ++counter.current;
    setNotifications((prevState) => {
      return { ...prevState, [id]: { type, message } };
    });
    setTimeout(() => {
      setNotifications((prev) => {
        const newState = { ...prev };
        delete newState[id];
        return newState;
      });
    }, 5000);
  };
  return (
    <div className="toast-list">
      {Object.keys(notifications).map((key) => {
        const item = notifications[key];
        return <NotificationItem {...item} key={key} />;
      })}
    </div>
  );
};
function NotificationItem({ type, message }: Props) {
  // let timer1: number, timer2: number;
  // nodeToast.current?.classList.add("active");
  // nodeProg.current?.classList.add("active");
  // timer1 = setTimeout(() => {
  //   nodeToast.current?.classList.remove("active");
  // }, 5000);
  // timer2 = setTimeout(() => {
  //   nodeProg.current?.classList.remove("active");
  // }, 5300);
  // const handleClose = () => {
  //   nodeToast.current?.classList.remove("active");
  //   setTimeout(() => {
  //     nodeProg.current?.classList.remove("active");
  //   }, 300);
  //   clearTimeout(timer1);
  //   clearTimeout(timer2);
  // };
  return (
    <div className="toast">
      <div className="toast-content">
        <i className="fas fa-solid fa-check check"></i>
        <div className="message">
          <span className="text text-1">{type}</span>
          <span className="text text-2">Your changes has been saved</span>
        </div>
      </div>
      {/* <i
        className="fal fa-times close"
        ref={nodeClose}
        onClick={handleClose}
      ></i> */}
      <div className="progress"></div>
    </div>
  );
}
export { Notifications, add };
