export type SheetColumn = {
  id: string;
  name: string;
  type: string;
  additional?: unknown;
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
