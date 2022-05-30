import "./Sheet.scss";
import { SheetImport } from "../../types/WorkbookImport";

const SheetsImport = ({ ...props }: SheetImport[]) => {
  return (
    <div className="sheet-wrapper">
      {/* {sheets.length > 0 &&
        sheets.map((item) => <SheetItem title={item} key={item}></SheetItem>)} */}
    </div>
  );
};

export default SheetsImport;
