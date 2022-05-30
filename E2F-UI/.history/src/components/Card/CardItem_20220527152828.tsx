import Avatar from "../../data/img/breadcurmb-img.png";
import DateIcon from "../../data/img/calendar-icon.png";
import { Workbook } from "../../types/Wordbook";
import Dropdown from "../common/dropdown/Dropdown";

export default function CardItem({
  id,
  name,
  description,
  url,
  createdAt,
}: Workbook) {
  const date = new Date(createdAt);
  return (
    <div className="card-item" key={id}>
      <div className="card-img">
        <img srcSet={url || Avatar} alt="" />
      </div>
      <div className="card-info">
        <div className="card-info-title">{name}</div>
        <div className="card-info-date">
          <img srcSet={DateIcon} alt="" className="card-info-icon" />
          <span className="card-info-text">{date.}</span>
        </div>
      </div>
      <p className="card-desc">{description}</p>
      <Dropdown id={id} key={id}></Dropdown>
    </div>
  );
}
