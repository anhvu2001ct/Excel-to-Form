import { ObjectType } from "../../types/common";
import { SheetColumn } from "../../types/Wordbook";
import InputDateForm from "../common/date/InputDateForm";
import InputForm from "../common/input/InputForm";
import Select from "../common/select/Select";
import Textarea from "../common/textarea/Textarea";
interface IProps {
  sheetCol: SheetColumn;
  valueField?: string;
  validateObj: ObjectType<boolean>;
}

export default function RenderField({
  sheetCol,
  valueField,
  validateObj,
}: IProps) {
  switch (sheetCol.type) {
    case "text":
    case "phone":
    case "email":
      return (
        <InputForm
          type={sheetCol.type}
          title={sheetCol.name}
          id={sheetCol.id}
          value={valueField}
          validateObj={validateObj}
        />
      );
    case "select":
      return (
        <Select
          title={sheetCol.name}
          addtional={sheetCol.additional as string[]}
          id={sheetCol.id}
          value={valueField}
        />
      );
    case "area":
      return (
        <Textarea title={sheetCol.name} id={sheetCol.id} value={valueField} />
      );
    case "date":
      return (
        <InputDateForm
          title={sheetCol.name}
          id={sheetCol.id}
          value={valueField}
        />
      );
    default:
      return null;
  }
}
