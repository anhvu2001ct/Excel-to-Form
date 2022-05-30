export type WorkbookImport = {
  workbookId: string;
  name: string;
  description?: string;
  extension?: string;
  sheets: SheetImport[];
};

export type SheetImport = {
  name: string;
  sheetIndex: number;
  cord: SheetCord;
  valid: boolean;
  fileds: string[];
};

export type SheetCord = {
  rowIndex?: number;
  columnStart?: string;
  columnEnd?: string;
};
