import { createContext, useContext, useState } from "react";
import { SheetImport } from "../types/WorkbookImport";

const SheetsImportContext = createContext(undefined);
function SheetsImportProvider(props: any) {
  const [sheets, setSheet] = useState<SheetImport[]>([]);
  return (
    <SheetsImportContext.Provider {...props}></SheetsImportContext.Provider>
  );
}
function useSheet() {
  const context = useContext(SheetsImportContext);
  return context;
}
