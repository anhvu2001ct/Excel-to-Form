import { useWorkbookImport } from "../../context/workbookImport-context";
import { UseStateCom } from "../../types/common";

type Props = {
  title: string;
  placeHolder: string;
  type?: string;
  index: number;
  col: string;
};
const SheetInput = ({ title, placeHolder, type, index, col }: Props) => {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  const sheet = workbookImport.sheets[index];
  return (
    <div className="sheet-input">
      <span className="sheet-input-title sheet-name-title">{title}</span>
      <input
        type={type ?? "text"}
        className="sheet-input-number"
        placeholder={placeHolder}
        value={sheet.cord[col as typeof SheetCord]}
        onChange={(e) => state[1](e.target.value)}
      />
    </div>
  );
};

export default SheetInput;
