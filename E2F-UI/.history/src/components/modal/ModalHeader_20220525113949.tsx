type Props = {
  url?: string;
  name: string;
  desc?: string;
};
export default function ModalHeader({ url, name, desc }: Props) {
  return (
    <div className="modal-top">
      <img
        src={url ?? "https://source.unsplash.com/random"}
        alt="hinh"
        className="modal-top-image"
      />
      <div className="modal-top-content">
        <input type="text" className="modal-top-title" />
        <div className="modal-top-title">{name}</div>
        <textarea className="modal-top-desc" value={desc}></textarea>
      </div>
    </div>
  );
}
