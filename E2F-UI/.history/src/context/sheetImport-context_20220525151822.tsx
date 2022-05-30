import { createContext, useContext, useState } from "react";
import { Sheet } from "../types/Wordbook";
import { SheetImport } from "../types/WorkbookImport";

const SheetsImportContext = createContext<SheetImport[]>([]);
function SheetsImportProvider(props: any) {
  const [sheets, setSheet] = useState<SheetImport[]>([]);
  const value = { sheets, setSheet };
  return (
    <SheetsImportContext.Provider
      value={value}
      {...props}
    ></SheetsImportContext.Provider>
  );
}
function useSheet() {
  const context = useContext(SheetsImportContext);
  return context;
}
export { SheetsImportProvider, useSheet };
