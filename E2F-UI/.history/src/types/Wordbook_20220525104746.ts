export type SheetColumn = {
  id: string;
  name: string;
  type: string;
  addtional?: unknown;
};

export type Sheet = {
  name: string;
  columns: SheetColumn[];
};

export type Workbook = {
  id: number;
  name: string;
  createdAt: string;
  description?: string;
  url?: string;
  sheets: Sheet[];
};
