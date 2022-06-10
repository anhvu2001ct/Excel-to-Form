import { ReactNode } from "react";
import useClickOutSide from "../../../hooks/useClickOutSide";
import "./Dropdown.scss";

type Props = {
  list: {
    type: "danger" | "normal";
    title: string;
  }[];
  onClick: (clickPos: number, title: string) => void;
};

export default function Dropdown({ list, onClick }: Props) {
  const { show, setShow, nodeRef } = useClickOutSide();
  return (
    <div className="card-toggle" ref={nodeRef} onClick={() => setShow(!show)}>
      <i className="far fa-ellipsis-v"></i>
      {
        <ul className={`dropdown ${show ? "active" : ""} `}>
          {list.map((item, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                item.type === "danger" ? "dropdown-item--danger" : ""
              } `}
              onClick={() => onClick(index, item.title)}
            >
              {item.title}
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
