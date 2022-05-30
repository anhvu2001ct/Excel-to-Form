import "./Sheet.scss";
import { SheetImport } from "../../types/WorkbookImport";
import SheetItem from "./SheetItem";

const SheetsImport = (sheets: SheetImport[]) => {
  return (
    <div className="sheet-wrapper">
      {props.map((item) => (
        <SheetItem
          name={item.name}
          cord={item.cord}
          key={item.sheetIndex}
        ></SheetItem>
      ))}
    </div>
  );
};

export default SheetsImport;
