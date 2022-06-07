import { FormEventHandler, memo, useRef, useState } from "react";
import { sheetEnpoint } from "../../fetchingAPI/fetchingApi";
import { SheetColumn } from "../../types/Wordbook";
import Button from "../common/button/btnPrimary/Button";
import Date from "../common/date/Date";
import InputForm from "../common/input/InputForm";
import Select from "../common/select/Select";
import Textarea from "../common/textarea/Textarea";
import { add } from "../notification/Notifications";
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
  const [errorForm, setErrorForm] = useState<string[]>([]);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      if (errorForm.length > 0) {
        return;
      }
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

  function renderComponent(sheetCol: SheetColumn, index: number) {
    switch (sheetCol.type) {
      case "text":
        return (
          <InputForm
            error={errorForm!}
            setErrorForm={setErrorForm}
            type={sheetCol.type}
            key={index}
            title={sheetCol.name}
            id={sheetCol.id}
          />
        );
      case "select":
        return (
          <Select
            key={index}
            title={sheetCol.name}
            addtional={sheetCol.additional as string[]}
            id={sheetCol.id}
          />
        );
      case "area":
        return <Textarea title={sheetCol.name} key={index} id={sheetCol.id} />;
      case "phone":
        return (
          <InputForm
            error={errorForm!}
            setErrorForm={setErrorForm}
            type={sheetCol.type}
            key={index}
            title={sheetCol.name}
            id={sheetCol.id}
          />
        );
      case "email":
        return (
          <InputForm
            error={errorForm!}
            setErrorForm={setErrorForm}
            type={sheetCol.type}
            key={index}
            title={sheetCol.name}
            id={sheetCol.id}
          />
        );
      case "date":
        return <Date key={index} title={sheetCol.name} id={sheetCol.id} />;
      default:
        return null;
    }
  }
  return (
    <form
      className="sheet-form"
      onSubmit={handleSubmit}
    >
      {columns.map((item, index) => renderComponent(item, index))}
      <div className="btn-form-container">
        <Button title="Save" isFormSubmit={true} />
      </div>
    </form>
  );
});
