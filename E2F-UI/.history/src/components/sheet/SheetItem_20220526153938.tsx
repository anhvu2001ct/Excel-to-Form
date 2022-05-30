import { useState } from "react";
import { useWorkbookImport } from "../../context/workbookImport-context";
import { importEndpoint } from "../../fetchingAPI/fetchingApi";
import { ResultType } from "../../types/common";
import { SheetCord } from "../../types/WorkbookImport";
import ButtonCheck from "../common/button/btnCheck/ButtonCheck";
import SheetInput from "./SheetInput";
type Props = {
  index: number;
};
const SheetItem = ({ index }: Props) => {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  const sheet = workbookImport.sheets[index];
  const handleCheckField = async () => {
    try {
      const response = await fetch(`${importEndpoint}/validate`, {
        method: "POST",
        body: JSON.stringify({
          sheetId: workbookImport.workbookId,
          sheetIndex: sheet.sheetIndex,
          rowIndex: sheet.cord.rowIndex,
          startCol: sheet.cord.columnStart,
          endCol: sheet.cord.columnEnd,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result: ResultType<SheetCord> = await response.json();

      if (!response.ok) throw new Error(result.message as string);

      setWorkbookImport(prevState => {
        const newState = { ...prevState };
        
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sheet-item ">
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
      <ButtonCheck title="Check" onClick={handleCheckField} />
    </div>
  );
};

export default SheetItem;
