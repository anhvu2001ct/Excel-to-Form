import { useWorkbookImport } from "../../context/workbookImport-context";
import { useForm } from "react-hook-form";
type Props = {
  name: string,
  description:string
};
export default function ModalHeader() {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  const {} = useForm({
    defaultValues: {
      name: "Workbook name",
      description:"Description goes here..."
    },
  });
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
            {...register("name")}
            value={workbookImport?.name ?? ""}
            placeholder="Workbook name"
            onChange={(e) => {
              setWorkbookImport((old) => ({ ...old, name: e.target.value }));
              handleWorkbookName(e);
            }}
          />
        </div>
        <textarea
          {...register("description")}
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
