import { workbookEnpoint } from "../../../fetchingAPI/fetchingApi";
import useClickOutSide from "../../../hooks/useClickOutSide";
import EventEmiiter from "../../../lib/EventEmitter";
import { add } from "../../notification/Notifications";

type Props = {
  id: number;
};

import "./Dropdown.scss";
export const deleteEvent = new EventEmiiter<void>();
export default function Dropdown({ id }: Props) {
  const { show, setShow, nodeRef } = useClickOutSide();
  const handleDeleteWorkbook = async () => {
    try {
      const response = await fetch(workbookEnpoint + `/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      const result = data.message;
      if (!response.ok) throw new Error(result);
      add("success", result);
      deleteEvent.emit();
    } catch (error) {
      const e = error as Error;
      add("error", e.message);
    }
  };
  return (
    <div className="card-toggle" ref={nodeRef} onClick={() => setShow(!show)}>
      <i className="far fa-ellipsis-v"></i>
      {
        <ul className={`dropdown ${show ? "active" : ""} `}>
          <li
            className="dropdown-item dropdown-item--danger"
            onClick={handleDeleteWorkbook}
          >
            Delete template
          </li>
        </ul>
      }
    </div>
  );
}
