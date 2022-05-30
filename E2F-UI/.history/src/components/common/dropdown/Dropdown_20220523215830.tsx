import "./Dropdown.scss";
export default function Dropdown() {
  return (
    <div className="card-toggle">
      <i className="far fa-ellipsis-v"></i>
      <ul className="dropdown">
        <li className="dropdown-item">Edit Template</li>
        <li className="dropdown-item">Save</li>
        <li className="dropdown-item dropdown-item--danger">Delete template</li>
      </ul>
    </div>
  );
}
