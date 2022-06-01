import { memo, useRef, useState } from "react";
import { sheetEnpoint } from "../../fetchingAPI/fetchingApi";
import { SheetColumn } from "../../types/Wordbook";
import Button from "../common/button/btnPrimary/Button";
import Date from "../common/date/Date";
import InputForm from "../common/input/InputForm";
import Select from "../common/select/Select";
import Textarea from "../common/textarea/Textarea";
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
  const ref = useRef<any>();
  const handleSubmit = async () => {
    try {
      const formData = new FormData(ref.current);
      const response = await fetch(
        sheetEnpoint + `/add/${workbookId}/${sheetId}/`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  function renderComponent(sheetCol: SheetColumn, index: number) {
    switch (sheetCol.type) {
      case "text":
        return (
          <InputForm
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
            type={sheetCol.type}
            key={index}
            title={sheetCol.name}
            id={sheetCol.id}
          />
        );
      case "email":
        return (
          <InputForm
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
      ref={ref}
      className="sheet-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {columns.map((item, index) => renderComponent(item, index))}
      <div className="btn-form-container">
        <Button title="Save" isFormSubmit={true} />
      </div>
    </form>
  );
});
