import "./Sheet.scss";
import { SheetImport } from "../../types/WorkbookImport";
import SheetItem from "./SheetItem";
import { useWorkbookImport } from "../../context/workbookImport-context";

const SheetsImport = () => {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  return (
    <div className="sheet-wrapper">
      {sheets.map((item) => (
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
