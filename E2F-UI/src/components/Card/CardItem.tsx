import { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../data/img/breadcurmb-img.png";
import DateIcon from "../../data/img/calendar-icon.png";
import { Workbook } from "../../types/Wordbook";
import Dropdown from "../common/dropdown/Dropdown";
import EditCard from "./EditCard";

interface Props extends Workbook {
  onDelete: (id: number) => void;
}

export default function CardItem({
  id,
  name,
  description,
  url,
  createdAt,
  onDelete,
}: Props) {
  const [editModal, setEditModal] = useState(false);
  const workbookUpdate = {
    id,
    name,
    description,
    url,
  };
  const handleAction = (index: number, workbookId: number) => {
    if (index === 0) onDelete(id);
    else if (index === 1) setEditModal(true);
  };
  return (
    <div className="card-item">
      <Link to={`workbook/${id}`} className="card-item-detail" key={id}>
        <div className="card-img">
          <img srcSet={url || Avatar} alt="" />
        </div>
        <div className="card-info">
          <div className="card-info-title">{name}</div>
          <div className="card-info-date">
            <img srcSet={DateIcon} alt="" className="card-info-icon" />
            <span className="card-info-text">{createdAt}</span>
          </div>
        </div>
        <p className="card-desc">{description}</p>
      </Link>
      <Dropdown
        list={[
          { title: "Delete", type: "danger" },
          { title: "Edit", type: "normal" },
        ]}
        onClick={(index) => handleAction(index, id)}
      ></Dropdown>
      {editModal && (
        <EditCard
          workbookUpdate={workbookUpdate}
          onClose={() => setEditModal(false)}
        />
      )}
    </div>
  );
}
