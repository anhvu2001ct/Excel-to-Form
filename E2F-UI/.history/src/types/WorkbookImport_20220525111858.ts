export type WorkbookImport = {
  id
}

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
