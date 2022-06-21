export type SheetColumn = {
  id: number;
  name: string;
  columnType: string;
  isRequired: boolean;
  columnIndex: number;
  selectOptions?: string[];
};
