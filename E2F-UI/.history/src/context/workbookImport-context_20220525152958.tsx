import { createContext, useContext, useState } from "react";
import { Sheet } from "../types/Wordbook";
import { SheetImport, WorkbookImport } from "../types/WorkbookImport";

const WorkbookImportContext = createContext<WorkbookImport>({

});

function WorkbookImportProvider({ children }: any) {
  const [workbookImport, setWorkbookImport] = useState<WorkbookImport>();
  const value = { workbookImport, setWorkbookImport };
  return (
    <WorkbookImportContext.Provider value={value}>
      {children}
    </WorkbookImportContext.Provider>
  );
}
function useWorkbook() {
  const context = useContext(WorkbookImportContext);
  return context;
}
export { WorkbookImportProvider, useWorkbook };
