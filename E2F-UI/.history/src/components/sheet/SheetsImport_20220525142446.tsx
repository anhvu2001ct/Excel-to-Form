import "./Sheet.scss";
import { SheetImport } from "../../types/WorkbookImport";

const SheetsImport = (props: SheetImport[]) => {
  return (
    <div className="sheet-wrapper">
      {props.length > 0 &&
        props.map((item) => <SheetItem title={item} key={item}></SheetItem>)}
    </div>
  );
};

export default SheetsImport;
