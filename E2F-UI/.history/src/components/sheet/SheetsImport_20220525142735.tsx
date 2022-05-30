import "./Sheet.scss";
import { SheetImport } from "../../types/WorkbookImport";
import SheetItem from "./SheetItem";

const SheetsImport = (props: SheetImport[]) => {
  return (
    <div className="sheet-wrapper">
      {props.map((item) => (
        <SheetItem
          name={item}
          cord={item.cord}
          key={item.sheetIndex}
        ></SheetItem>
      ))}
    </div>
  );
};

export default SheetsImport;
