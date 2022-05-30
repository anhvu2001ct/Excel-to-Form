import { useWorkbookImport } from "../../context/workbookImport-context";
import { UseStateCom } from "../../types/common";

export default function ModalHeader() {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();

  return (
    <div className="modal-top">
      <img
        src={"https://source.unsplash.com/random"}
        alt="hinh"
        className="modal-top-image"
      />
      <div className="modal-top-content">
        <div className="modal-top-title">
          <input
            value={workbookImport?.name}
            onChange={(e) => setWorkbookImport((old) =>  { return ...old, name: e.target.value})}
          />
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
