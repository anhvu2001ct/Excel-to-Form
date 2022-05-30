import "./Sheet.scss";
import { SheetImport } from "../../types/WorkbookImport";
import SheetItem from "./SheetItem";
import { useWorkbookImport } from "../../context/workbookImport-context";

const SheetsImport = () => {
  const [workbookImport] = useWorkbookImport();
  return (
    <div className="sheet-wrapper">
      {workbookImport?.sheets.map((_, idx) => (
        <SheetItem key={idx} index={idx}></SheetItem>
      ))}
    </div>
  );
};

export default SheetsImport;
