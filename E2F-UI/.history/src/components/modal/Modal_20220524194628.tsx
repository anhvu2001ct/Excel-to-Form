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
            className="modal-"
          />
        </div>
      </div>
    </div>
  );
}
