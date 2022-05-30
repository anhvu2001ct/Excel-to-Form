import { createContext, useContext, useState } from "react";
import { Sheet } from "../types/Wordbook";
import { SheetImport, WorkbookImport } from "../types/WorkbookImport";

const workbookImportContext = createContext<WorkbookImport[]>([]);
function SheetsImportProvider(props: any) {
  const [sheets, setSheet] = useState<SheetImport[]>([]);
  const value = { sheets, setSheet };
  return (
    <workbookImportContext.Provider
      value={value}
      {...props}
    ></workbookImportContext.Provider>
  );
}
function useWorkbook() {
  const context = useContext(workbookImportContext);
  return context;
}
export { SheetsImportProvider, useSheet };
