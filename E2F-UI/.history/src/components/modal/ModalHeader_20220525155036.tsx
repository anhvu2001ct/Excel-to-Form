import { UseStateCom } from "../../types/common";

type Props = {
  url?: string;
};

export default function ModalHeader({ url }: Props) {
  const []

  return (
    <div className="modal-top">
      <img
        src={url ?? "https://source.unsplash.com/random"}
        alt="hinh"
        className="modal-top-image"
      />
      <div className="modal-top-content">
        <div className="modal-top-title">
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <textarea
          className="modal-top-desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
