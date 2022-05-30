import { useWorkbookImport } from "../../context/workbookImport-context";
import { SheetCord } from "../../types/WorkbookImport";
import ButtonCheck from "../common/button/btnCheck/ButtonCheck";
import SheetInput from "./SheetInput";
type Props = {
  name: string;
  cord: SheetCord;
};
const SheetItem = ({ name, cord }: Props) => {
  return (
    <div className="sheet-item">
      <div className="sheet-name">
        <span className="sheet-name-title">Sheet Name</span>
        <h2 className="sheet-name-text">{name}</h2>
      </div>
      <div className="sheet-input-container">
        <SheetInput
          title="Row number"
          placeHolder="Enter row number,...."
          value={cord.rowIndex}

        ></SheetInput>
        <SheetInput
          title="Column start "
          placeHolder="Enter Column number,...."
          value={cord.columnStart}
        ></SheetInput>
        <SheetInput
          title="Column end"
          placeHolder="Enter Column number,...."
          value={cord.columnEnd}
        ></SheetInput>
      </div>
      <ButtonCheck title="Check" />
    </div>
  );
};

export default SheetItem;
