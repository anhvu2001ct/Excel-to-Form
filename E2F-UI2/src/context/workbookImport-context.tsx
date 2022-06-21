import { createContext, useContext, useRef } from "react";
import { WorkbookImport } from "../types/WorkbookImport";

type WorkbookContextType = [
  () => WorkbookImport | undefined,
  (wb: WorkbookImport) => void
]

const workbookImportContext = createContext<WorkbookContextType>(undefined as any);
function WorkbookImportProvider(props: any) {
  const value = useRef<WorkbookImport>();
  const setValue = (wb: WorkbookImport) => (value.current = wb);
  return (
    <workbookImportContext.Provider
      value={[() => value.current, setValue]}
      {...props}
    ></workbookImportContext.Provider>
  );
}
function useWorkbookImport() {
  return useContext(workbookImportContext);
}
export { useWorkbookImport, WorkbookImportProvider };
