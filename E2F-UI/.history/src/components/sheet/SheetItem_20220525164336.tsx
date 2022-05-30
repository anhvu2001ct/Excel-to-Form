import { useWorkbookImport } from "../../context/workbookImport-context";
import { SheetCord } from "../../types/WorkbookImport";
import ButtonCheck from "../common/button/btnCheck/ButtonCheck";
import SheetInput from "./SheetInput";
type Props = {
  index: number;
};
const SheetItem = ({ index }: Props) => {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();


  const sheet = workbookImport.sheets[index];
  return (
    <div className="sheet-item">
      <div className="sheet-name">
        <span className="sheet-name-title">Sheet Name</span>
        <h2 className="sheet-name-text">{sheet.name}</h2>
      </div>
      <div className="sheet-input-container">
        <SheetInput
          type="number"
          title="Row number"
          placeHolder="Enter row number,...."
          value={sheet.cord.rowIndex}
          index={index}
        ></SheetInput>
        <SheetInput
          title="Column start "
          placeHolder="Enter Column number,...."
          value={sheet.cord.columnStart}
          index={index}
        ></SheetInput>
        <SheetInput
          title="Column end"
          placeHolder="Enter Column number,...."
          value={sheet.cord.columnEnd}
          index={index}
        ></SheetInput>
      </div>
      <ButtonCheck title="Check" />
    </div>
  );
};

export default SheetItem;
