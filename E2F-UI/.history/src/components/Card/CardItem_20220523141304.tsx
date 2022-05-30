import Avatar from "../../data/img/breadcurmb-img.png";
import Icon from "../../data/img/logo-img.png";
export default function CardItem() {
  return (
    <div className="card-item">
      <div className="card-img">
        <img srcSet={Avatar} alt="" />
      </div>
      <div className="card-info">
        <span className="card-info-title">Student</span>
        <div className="card-info-icon">
          <img srcSet={} alt="" />
        </div>
      </div>
    </div>
  );
}
