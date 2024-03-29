import { useState } from "react";
import { useWorkbookImport } from "../../context/workbookImport-context";
import { importEndpoint } from "../../fetchingAPI/fetchingApi";
import { ResultType } from "../../types/common";
import { SheetCord } from "../../types/WorkbookImport";
import ButtonCheck from "../common/button/btnCheck/ButtonCheck";
import { add } from "../notification/Notifications";
import SheetInput from "./SheetInput";
type Props = {
  index: number;
};
const SheetItem = ({ index }: Props) => {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  const [loading, setLoading] = useState(false);
  const sheet = workbookImport.sheets[index];
  const cord = sheet.cord;
  const handleCheckField = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${importEndpoint}/validate`, {
        method: "POST",
        body: JSON.stringify({
          workbookId: workbookImport.workbookId,
          sheetIndex: sheet.sheetIndex,
          rowIndex: cord.rowIndex,
          startCol: cord.columnStart,
          endCol: cord.columnEnd,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result: ResultType<{
        valid: boolean;
        cord: SheetCord;
        fields: string[];
      }> = await response.json();

      if (!response.ok) throw new Error(result.message as any);
      setWorkbookImport((prevState) => {
        const newState = { ...prevState };
        newState.sheets[index] = {
          ...newState.sheets[index],
          ...result.message,
        };
        return newState;
      });
      setLoading(false);
    } catch (error) {
      setWorkbookImport((prevState) => {
        const newState = { ...prevState };
        newState.sheets[index].valid = false;
        return newState;
      });
      setLoading(false);
    }
  };

  return (
    <div className={`sheet-item ${!sheet.valid ? "error" : ""}`}>
      <div className="sheet-name">
        <span className="sheet-name-title">Sheet Name</span>
        <h2 className="sheet-name-text">{sheet.name}</h2>
      </div>
      <div className="sheet-input-container">
        <SheetInput
          type="number"
          title="Row number"
          placeHolder="Enter row number,...."
          index={index}
          cordType="rowIndex"
        ></SheetInput>
        <SheetInput
          title="Column start "
          placeHolder="Enter Column number,...."
          index={index}
          cordType="columnStart"
        ></SheetInput>
        <SheetInput
          title="Column end"
          placeHolder="Enter Column number,...."
          index={index}
          cordType="columnEnd"
        ></SheetInput>
      </div>
      <ButtonCheck onClick={handleCheckField} isLoading={loading}>
        Check
      </ButtonCheck>
    </div>
  );
};

export default SheetItem;
