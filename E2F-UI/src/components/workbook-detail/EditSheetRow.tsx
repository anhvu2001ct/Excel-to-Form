import React, { useRef } from "react";
import ReactDom from "react-dom";
import { ObjectType } from "../../types/common";
import { SheetColumn, SheetRow } from "../../types/Wordbook";
import Button from "../common/button/btnPrimary/Button";
import RenderField from "../renderField/RenderField";
import "./Edit.scss";

interface IProp {
  columns: SheetColumn[];
  rowData: SheetRow;
  onSave: (e: React.FormEvent, rowId: number) => void;
  onClose: () => void;
}

const EditSheetRow = ({ columns, rowData, onSave, onClose }: IProp) => {
  if (typeof document === undefined) return null;
  const dataValid = useRef<ObjectType<boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    if (Object.keys(dataValid.current).length) return;
    onSave(e, rowData.id);
  };

  return ReactDom.createPortal(
    <form className="edit" onSubmit={handleSubmit}>
      <div className="edit-overlay"></div>
      <div className="edit-content">
        <h3 className="edit-title">EDIT ROW TABLE</h3>
        <span className="edit-icon" onClick={onClose}>
          <i className="fal fa-times"></i>
        </span>
        <div className="edit-list-field">
          {rowData.data.map((value, index) => (
            <RenderField
              key={columns[index].id}
              sheetCol={columns[index]}
              valueField={value}
              validateObj={dataValid.current}
            ></RenderField>
          ))}
        </div>
        <div className="edit-btn-wrapper">
          <Button title="Save" isFormSubmit={true}></Button>
          <Button title="Cancel" onClick={onClose} type="secondary"></Button>
        </div>
      </div>
    </form>,
    document.querySelector("body") as HTMLBodyElement
  );
};

export default EditSheetRow;
