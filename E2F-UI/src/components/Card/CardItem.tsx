import { Link } from "react-router-dom";
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
      <Dropdown id={id} key={id}></Dropdown>
    </div>
  );
}
