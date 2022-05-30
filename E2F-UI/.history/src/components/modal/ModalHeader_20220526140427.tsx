import { useWorkbookImport } from "../../context/workbookImport-context";
type Props = {
  onChange: ():Event => void;
};
export default function ModalHeader({ onChange }: Props) {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();

  const handleWorkbookName = (e: React.ChangeEvent<HTMLInputElement>) => {};
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
              onChange;
            }}
          />
        </div>
        <textarea
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
            onChange;
          }}
        ></textarea>
      </div>
    </div>
  );
}
