import { createContext, useContext, useState } from "react";
import { UseStateCom } from "../types/common";
import { Sheet } from "../types/Wordbook";
import { SheetImport, WorkbookImport } from "../types/WorkbookImport";

const WorkbookImportContext = createContext<UseStateCom<WorkbookImport>>(
  undefined as any
);

function WorkbookImportProvider({ children }: any) {
  const data = useState<WorkbookImport>();
  return (
    <WorkbookImportContext.Provider value={data}>
      {children}
    </WorkbookImportContext.Provider>
  );
}
function useWorkbook() {
  const context = useContext(WorkbookImportContext);
  return context;
}
export { WorkbookImportProvider, useWorkbook };
