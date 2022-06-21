import { Sheet } from "./Sheet";
import { SheetImport } from "./SheetImport";
import { Workbook } from "./Workbook";
export type WorkbookImport = {
  workbook: Workbook;
  sheets: SheetImport[];
};
