import { useWorkbookImport } from "../../context/workbookImport-context";
import { UseStateCom } from "../../types/common";
import { SheetCord } from "../../types/WorkbookImport";

type Props = {
  title: string;
  placeHolder: string;
  type?: string;
  index: number;
  cordType: keyof SheetCord;
};
const SheetInput = ({ title, placeHolder, type, index, cordType }: Props) => {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  const sheet = workbookImport.sheets[index];
  return (
    <div className="sheet-input">
      <span className="sheet-input-title sheet-name-title">{title}</span>
      <input
        type={type ?? "text"}
        className="sheet-input-number"
        placeholder={placeHolder}
        value={sheet.cord[cordType]?.toString() ?? ""}
        min="1"
        onChange={(e) => {
          if (e.target.value.length) {
            if (
              (!type || type === "text") &&
              (e.target.value.length > 3 ||
                /^[a-zA-Z]+$/.test(e.target.value) == false)
            )
              return;
            if (type === "number" && /^[0-9]+$/.test(e.target.value) == false)
              return;
          }
          setWorkbookImport((old) => {
            const value =
              type === "number" ? parseInt(e.target.value) : e.target.value;
            const newState = { ...old };
            newState.sheets[index].cord[cordType] = value as any;
            newState.sheets[index].valid = false;
            return newState;
          });
        }}
      />
    </div>
  );
};

export default SheetInput;
