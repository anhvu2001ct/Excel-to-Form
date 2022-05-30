export type WorkbookImport = {
  id: number;
  name: string;
  createdAt: string;
  description?: string;
  url?: string;
  sheets: Sheet[];
};

export type SheetImport = {
  name: string;
  sheetIndex: number;
  cord: SheetCord;
  fileds: string[];
};
export type SheetCord = {
  rowIndex: number;
  columnStart?: string;
  columnEnd?: string;
};
