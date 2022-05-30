import ImageDemo from "../../data/img/breadcurmb-img.png";
export default function CardItem() {
  return (
    <div className="card-item">
      <div className="card-img">
        <img srcSet={ImageDemo} alt="" />
      </div>
      <div className="card-info">
        <span className="card-info-title">Student</span>
        <div className="card-info-icon">
          img
        </div>
      </div>
    </div>
  );
}
