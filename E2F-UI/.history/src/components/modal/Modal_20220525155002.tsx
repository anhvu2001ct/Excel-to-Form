import { useContext, useEffect, useState } from "react";
import {
  useWorkbookImport,
  WorkbookImportProvider,
} from "../../context/workbookImport-context";
import { SheetImport, WorkbookImport } from "../../types/WorkbookImport";
import Button from "../common/button/btnPrimary/Button";
import Separator from "../common/separator/Separator";
import SheetsImport from "../sheet/SheetsImport";
import "./Modal.scss";
import ModalHeader from "./ModalHeader";
type Props = {
  close: () => void;
  file?: File;
};
export default function Modal({ file, close }: Props) {
  const formData = new FormData();
  formData.append("file", file!);
  const endpoint = `http://localhost:5121/api/v1/import/sheet`;
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.message);
        const result = data.message as WorkbookImport;
        setSheets(result.sheets);
        setTitle(result.name);
      } catch (error) {
        console.error(error);
        close();
      }
    };
    getData();
  }, []);
  return (
    <WorkbookImportProvider>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-container">
          <ModalHeader />
          <Separator title="Infomation of file" />
          <SheetsImport sheets={sheets} />
          <div className="btn-wrapper">
            <Button title="Cancel" type="secondary"></Button>
            <Button title="Create"></Button>
          </div>
        </div>
      </div>
    </WorkbookImportProvider>
  );
}
