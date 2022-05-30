type Props = {
  url: string;
  name: string;
  description: string;
};
export default function ModalHeader({ url, name, description }: Props) {
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
