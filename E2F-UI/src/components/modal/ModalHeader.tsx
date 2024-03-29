import { useWorkbookImport } from "../../context/workbookImport-context";
import DefaultImage from "../../data/img/default-img.webp";
export default function ModalHeader() {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  return (
    <div className="modal-top">
      <img src={DefaultImage} alt="hinh" className="modal-top-image" />
      <div className="modal-top-content">
        <div
          className={`modal-top-title ${
            workbookImport?.name.length < 1 ? "error" : ""
          }`}
        >
          <label htmlFor="modal-name" className="modal-top-label">
            <i className="fas fa-pen-alt"></i>
          </label>
          <input
            value={workbookImport?.name ?? ""}
            placeholder="Enter title"
            name="name"
            id="modal-name"
            onChange={(e) => {
              setWorkbookImport((old) => ({ ...old, name: e.target.value }));
            }}
          />
        </div>
        <textarea
          name="description"
          className={`modal-top-desc ${
            workbookImport?.description?.length! > 0 ? "" : "error"
          }`}
          value={workbookImport?.description ?? ""}
          placeholder="Description goes here..."
          onChange={(e) => {
            {
              setWorkbookImport((old) => ({
                ...old,
                description: e.target.value,
              }));
            }
          }}
        ></textarea>
      </div>
    </div>
  );
}
