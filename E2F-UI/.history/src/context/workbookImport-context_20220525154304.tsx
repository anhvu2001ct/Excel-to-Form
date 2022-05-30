import { createContext, useContext, useState } from "react";
import { UseStateCom } from "../types/common";
import { Sheet } from "../types/Wordbook";
import { SheetImport, WorkbookImport } from "../types/WorkbookImport";

const WorkbookImportContext = createContext<(typeof useState<WorkbookImport>())>(
  undefined as any
);

function WorkbookImportProvider({ children }: any) {
  const data = useState<WorkbookImport>(undefined as any);
  return (
    <WorkbookImportContext.Provider value={data}>
      {children}
    </WorkbookImportContext.Provider>
  );
}
function useWorkbookImport() {
  return useContext(WorkbookImportContext);
}
export { WorkbookImportProvider, useWorkbookImport };
