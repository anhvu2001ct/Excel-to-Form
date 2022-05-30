export default function ModalHeader() {
  return (
    <div className="modal-top">
      <img
        src="https://source.unsplash.com/random"
        alt=""
        className="modal-top-image"
      />
      <div className="modal-top-content">
        <div className="modal-top-title">{response?.name}</div>
        <textarea
          className="modal-top-desc"
          value={response?.description}
        ></textarea>
      </div>
    </div>
  );
}
