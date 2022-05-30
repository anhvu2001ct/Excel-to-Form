import useClickOutSide from "../../../hooks/useClickOutSide";

type Props = {

}

import "./Dropdown.scss";
export default function Dropdown({ id: number }) {
  const { show, setShow, nodeRef } = useClickOutSide();
  return (
    <div
      className="card-toggle"
      key={id}
      ref={nodeRef}
      onClick={() => setShow(!show)}
    >
      <i className="far fa-ellipsis-v"></i>
      {
        <ul className={`dropdown ${show ? "active" : ""} `}>
          <li className="dropdown-item">Edit Template</li>
          <li className="dropdown-item dropdown-item--danger">
            Delete template
          </li>
        </ul>
      }
    </div>
  );
}
