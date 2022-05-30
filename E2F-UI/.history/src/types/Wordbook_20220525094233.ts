export type SheetColumn = {
  id: string;
  name: string;
  type: string;
  addtional?: any
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
};

