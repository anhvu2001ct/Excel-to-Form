import React, { useEffect, useRef, useState } from "react";
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
    }, 5550);
  };
  return (
    <div className={`toast-list`}>
      {Object.keys(notifications).map((key) => {
        const item = notifications[key];
        return <NotificationItem {...item} key={key} />;
      })}
    </div>
  );
};

const NotificationItem = React.memo(function ({ type, message }: Props) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 20);
    setTimeout(() => {
      setActive(false);
    }, 5000);

  }, []);

  return (
    <div className={`toast ${active ? "active" : ""}`}>
      <div className="toast-content">
        <i className="fas fa-solid fa-check check"></i>
        <div className="message">
          <span className="text text-1">{type}</span>
          <span className="text text-2">{message}</span>
        </div>
      </div>
      {/* <i
        className="fal fa-times close"
        ref={nodeClose}
        onClick={handleClose}
      ></i> */}
      <div className={`progress`}></div>
    </div>
  );
});
export { Notifications, add };
