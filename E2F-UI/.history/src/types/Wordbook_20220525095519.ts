export type SheetColumn = {
  id: string;
  name: string;
  type: string;
  date: string;
  addtional?: unknown;
};

export type Sheet = {
  name: string;
  columns: SheetColumn[];
};

export type Workbook = {
  id: number;
  name: string;
  description?: string;
  url?: string;
  sheets: Sheet[];
};
