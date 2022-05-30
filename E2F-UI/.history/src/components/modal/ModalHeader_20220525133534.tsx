type Props = {
  url?: string;
  nameCom: any;
  descCom?: any;
  setName: any;
};
export default function ModalHeader({ url, nameCom, descCom, setName }: Props) {
  return (
    <div className="modal-top">
      <img
        src={url ?? "https://source.unsplash.com/random"}
        alt="hinh"
        className="modal-top-image"
      />
      <div className="modal-top-content">
        <input
          type="text"
          className="modal-top-title"
          value={nameCom}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea className="modal-top-desc" value={descCom}></textarea>
      </div>
    </div>
  );
}
