import "./Sheet.scss";
import { SheetImport } from "../../types/WorkbookImport";
import SheetItem from "./SheetItem";
import { useWorkbookImport } from "../../context/workbookImport-context";

const SheetsImport = () => {
  const [workbookImport] = useWorkbookImport();
  return (
    <div className="sheet-wrapper">
      {workbookImport?.sheets.map((item, index) => (
        <SheetItem
          name={item.name}
          cord={item.cord}
          key={index}
        ></SheetItem>
      ))}
    </div>
  );
};

export default SheetsImport;
