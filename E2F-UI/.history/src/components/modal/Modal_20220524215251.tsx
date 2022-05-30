import Separator from "../common/separator/Separator";
import Sheet from "../sheet/Sheet";
import "./Modal.scss";
export default function Modal() {
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-container">
        <div className="modal-top">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="modal-top-image"
          />
          <div className="modal-top-content">
            <div className="modal-top-title">Lorem ipsum dolor</div>
            <textarea className="modal-top-desc">
              Enter your description here.....
            </textarea>
          </div>
        </div>
        <Separator title="Infomation of file" />
        <Sheet></Sheet>
      </div>
    </div>
  );
}
