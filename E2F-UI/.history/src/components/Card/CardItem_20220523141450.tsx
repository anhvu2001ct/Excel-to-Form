import Avatar from "../../data/img/breadcurmb-img.png";
import DateIcon from "../../data/img/logo-img.png";
export default function CardItem() {
  return (
    <div className="card-item">
      <div className="card-img">
        <img srcSet={Avatar} alt="" />
      </div>
      <div className="card-info">
        <span className="card-info-title">Student</span>
        <img srcSet={DateIcon} alt="" className="card-info-icon" />
      </div>
    </div>
  );
}
