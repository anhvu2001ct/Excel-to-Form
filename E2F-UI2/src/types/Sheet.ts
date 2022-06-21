import { SheetColumn } from "./SheetColumn";

export type Sheet = {
  id: number;
  name: string;
  headerStartRow: number;
  headerEndRow: number;
  headerStartCol: string;
  headerEndCol: string;
  sheetIndex: number;
  columns: SheetColumn[];
};
