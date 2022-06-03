import { ReactNode } from "react";
import useClickOutSide from "../../../hooks/useClickOutSide";
import "./Dropdown.scss";

type Props = {
  list: ReactNode[];
  onClick: (clickPos: number) => void;
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
              className="dropdown-item dropdown-item--danger"
              onClick={() => onClick(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
