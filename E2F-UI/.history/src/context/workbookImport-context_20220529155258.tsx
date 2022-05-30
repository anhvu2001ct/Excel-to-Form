import { createContext, useContext, useState } from "react";
import { UseStateCom } from "../types/common";
import { WorkbookImport } from "../types/WorkbookImport";

const WorkbookImportContext = createContext<UseStateCom<WorkbookImport>>(
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

function useWorkbookImport(condition?: boolean) {
  return condition
    ? useContext(WorkbookImportContext)
    : useContext(undefined as any);
}

export { WorkbookImportProvider, useWorkbookImport };
