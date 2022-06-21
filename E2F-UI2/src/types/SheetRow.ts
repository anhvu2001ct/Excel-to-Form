import { SheetField } from "./SheetField";

export type SheetRow = {
  id: number;
  createdAt: string;
  fields: SheetField[];
};
