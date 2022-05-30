import { useWorkbookImport } from "../../context/workbookImport-context";

type Props = {
  type: "modal" | "detail";
};

export default function ModalHeader({ type }: Props) {
  let check: boolean;
  if (type === "modal") {
  }
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  return (
    <div className="modal-top">
      <img
        src={"https://source.unsplash.com/random"}
        alt="hinh"
        className="modal-top-image"
      />
      <div className="modal-top-content">
        <div
          className={`modal-top-title ${
            workbookImport?.name.length < 1 ? "error" : ""
          }`}
        >
          <input
            value={workbookImport?.name ?? ""}
            placeholder="Enter title"
            name="name"
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
