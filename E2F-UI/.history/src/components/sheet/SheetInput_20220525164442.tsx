import { useWorkbookImport } from "../../context/workbookImport-context";
import { UseStateCom } from "../../types/common";

type Props = {
  title: string;
  placeHolder: string;
  type?: string;
  
};
const SheetInput = ({ title, placeHolder, type, state }: Props) => {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  return (
    <div className="sheet-input">
      <span className="sheet-input-title sheet-name-title">{title}</span>
      <input
        type={type ?? "text"}
        className="sheet-input-number"
        placeholder={placeHolder}
        value={state[0]}
        onChange={(e) => state[1](e.target.value)}
      />
    </div>
  );
};

export default SheetInput;
