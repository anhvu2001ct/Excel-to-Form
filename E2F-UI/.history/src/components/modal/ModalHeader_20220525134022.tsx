type UseStateCom<T> = [T, (prevState: T) => void];

type Props = {
  url?: string;
  nameCom: UseStateCom<string>;
  descCom?: string;
  setName: Function;
};
export default function ModalHeader({ url, nameCom, descCom }: Props) {
  const [name, setName] = nameCom;
  const [name, setName] = nameCom;

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea className="modal-top-desc" value={descCom}></textarea>
      </div>
    </div>
  );
}
