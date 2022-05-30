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
        <div className="card-info-date">
          <img srcSet={DateIcon} alt="" className="card-info-icon" />
          <span className="card-info-text">20/10/2002</span>
        </div>
      </div>
      <p className="card-desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est soluta
        quidem ipsam sit maiores exercitationem ducimus nihil laborum similique
        assumenda facere possimus harum eaque, repudiandae id modi, reiciendis
        nobis. Incidunt!
      </p>
    </div>
  );
}
