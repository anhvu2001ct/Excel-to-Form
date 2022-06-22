import { createContext, useContext, useRef } from "react";

type SortQuery = {
  columnId: number;
  order: string;
};

type SheetSearchQuery = {
  sorting?: SortQuery;
  searchPatterns: Record<number, string | undefined>;
};

type WorkbookExportView = Record<number, SheetSearchQuery>;

const WorkbookSheetsContext = createContext<WorkbookExportView>({});

function WorkbookSheetsProvider(props: any) {
  const value = {};

  return <WorkbookSheetsContext.Provider value={value} {...props} />;
}

function useWorkbookSheets() {
  return useContext(WorkbookSheetsContext);
}

export { useWorkbookSheets, WorkbookSheetsProvider };
