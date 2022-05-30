import { useWorkbookImport } from "../../context/workbookImport-context";

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
            value={workbookImport?.name ?? ""}
            placeholder="Workbook name"
            name="name"
            onChange={(e) => {
              setWorkbookImport((old) => ({ ...old, name: e.target.value }));
            }}
          />
          {workbookImport?.name.length < 1 &&(
            <p></p>
          ) }
        </div>
        <textarea
          name="description"
          className="modal-top-desc"
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
