import ImageDemo from "../../data/img/breadcurmb-img.png";
export default function CardItem() {
  return (
    <div className="card-item">
      <div className="card-img">
        <img srcSet={ImageDemo} alt="" />
      </div>
      <div className="card-header">
        <span className="card-title">Student</span>
        <span></span>
      </div>
    </div>
  );
}
