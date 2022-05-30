import useClickOutSide from "../../../hooks/useClickOutSide";
import "./Dropdown.scss";
export default function Dropdown() {
  const { show: boolean, setShow, nodeRef } = useClickOutSide();
  return (
    <div className="card-toggle" ref={nodeRef} onClick={() => setShow(!show)}>
      <i className="far fa-ellipsis-v"></i>
      {
        <ul
          className="dropdown"
          style={
            show && {
              opacity: 0,
              visibility: "hidden",
            }
          }
        >
          <li className="dropdown-item">Edit Template</li>
          <li className="dropdown-item">Save</li>
          <li className="dropdown-item dropdown-item--danger">
            Delete template
          </li>
        </ul>
      }
    </div>
  );
}
