import { useWorkbookImport } from "../../context/workbookImport-context";
type Props = {
  onChange: (e: any) => void;
};
export default function ModalHeader({ onChange }: Props) {
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
              onChange(e);
            }}
          />
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
            onChange(e);
          }}
        ></textarea>
      </div>
    </div>
  );
}
