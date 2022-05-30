import useClickOutSide from "../../../hooks/useClickOutSide";
import "./Dropdown.scss";
export default function Dropdown() {
  const { show, setShow, nodeRef } = useClickOutSide();
  return (
    <div className="card-toggle" ref={nodeRef}>
      <i className="far fa-ellipsis-v"></i>
      <ul className="dropdown">
        <li className="dropdown-item">Edit Template</li>
        <li className="dropdown-item">Save</li>
        <li className="dropdown-item dropdown-item--danger">Delete template</li>
      </ul>
    </div>
  );
}
