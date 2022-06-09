import { memo, useRef } from "react";
import { sheetEnpoint } from "../../fetchingAPI/fetchingApi";
import { ObjectType } from "../../types/common";
import { SheetColumn } from "../../types/Wordbook";
import Button from "../common/button/btnPrimary/Button";
import { add } from "../notification/Notifications";
import RenderField from "../renderField/RenderField";
import "./Form.scss";

type Props = {
  sheetId: number;
  workbookId: number;
  columns: SheetColumn[];
  onSubmit: () => void;
};
export default memo(function Form({
  columns,
  sheetId,
  workbookId,
  onSubmit,
}: Props) {
  const dataValid = useRef<ObjectType<boolean>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      if (Object.keys(dataValid.current).length) return;
      const response = await fetch(
        sheetEnpoint + `/add/${workbookId}/${sheetId}/`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      add("success", "Data added succecssfully");
      form.reset();
      onSubmit();
    } catch (error) {
      add("error", error as string);
    }
  };

  return (
    <form className="sheet-form" onSubmit={handleSubmit}>
      {columns.map((item, index) => (
        <RenderField
          key={index}
          sheetCol={item}
          validateObj={dataValid.current}
        />
      ))}
      <div className="btn-form-container">
        <Button title="Save" isFormSubmit={true} />
      </div>
    </form>
  );
});
