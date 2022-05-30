type Props = {
  url?: string;
  nameCom: Function;
  desc?: string;
};
export default function ModalHeader({ url, nameCom, descCom }: Props) {
  return (
    <div className="modal-top">
      <img
        src={url ?? "https://source.unsplash.com/random"}
        alt="hinh"
        className="modal-top-image"
      />
      <div className="modal-top-content">

        <div className="modal-top-title">{name}</div>
        <textarea className="modal-top-desc" value={desc}></textarea>
      </div>
    </div>
  );
}
