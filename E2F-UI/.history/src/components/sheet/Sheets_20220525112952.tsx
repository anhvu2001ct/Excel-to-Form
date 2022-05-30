import SheetItem from "./SheetItem";
import "./Sheet.scss";
import Button from "../common/button/btnPrimary/Button";
import { SheetImport } from "../../types/WorkbookImport";

const Sheets = ({}: SheetImport) => {
  return (
    <div className="sheet-wrapper">
      {sheets.length > 0 &&
        sheets.map((item) => <SheetItem title={item} key={item}></SheetItem>)}
    </div>
  );
};

export default Sheets;
