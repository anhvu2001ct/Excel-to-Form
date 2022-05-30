export type SheetImport = {
  name: string;
  sheetIndex: number;
  cord: SheetCord;
  
}
export type SheetCord = {
  rowIndex: number;
  columnStart?: string;
  columnEnd?: string;
}