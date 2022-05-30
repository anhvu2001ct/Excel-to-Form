import { useWorkbookImport } from "../../context/workbookImport-context";
import useValidation from "../../hooks/useValidation";
export default function ModalHeader() {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  const handleWorkbookName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {} = useValidation(e.target.value, "text" as string);
  };
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
            onChange={(e) => {
              setWorkbookImport((old) => ({ ...old, name: e.target.value }));
              handleWorkbookName(e);
            }}
          />
        </div>
        <textarea
          className="modal-top-desc"
          value={workbookImport?.description ?? ""}
          placeholder="Description goes here..."
          onChange={(e) =>
            setWorkbookImport((old) => ({
              ...old,
              description: e.target.value,
            }))
          }
        ></textarea>
      </div>
    </div>
  );
}
