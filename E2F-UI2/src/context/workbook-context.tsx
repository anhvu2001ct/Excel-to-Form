import { createContext, useContext, useState } from "react";
import { UseStateCom } from "../types/Base";
import { WorkbookSheets } from "../types/WorkbookSheets";

const WorkbookSheetContext = createContext<UseStateCom<WorkbookSheets>>(
  undefined as any
);
function WorkbookSheetProvider(props: any) {
  const value = useState<WorkbookSheets>({} as WorkbookSheets);
  return (
    <WorkbookSheetContext.Provider
      value={value}
      {...props}
    ></WorkbookSheetContext.Provider>
  );
}
function useWorkbookSheet() {
  return useContext(WorkbookSheetContext);
}
export { useWorkbookSheet, WorkbookSheetProvider };
