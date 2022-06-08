import "./NotFoundStyle.scss";
import  imgNotFound from "../../data/img/notfound.png"
export default function () {
  return (
    <div className="div-image">
      <img src={imgNotFound} alt="image not found" />
    </div>
  );
}