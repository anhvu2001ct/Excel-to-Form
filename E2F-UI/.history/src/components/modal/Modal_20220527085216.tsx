import { Fragment, useEffect } from "react";
import { useWorkbookImport } from "../../context/workbookImport-context";
import { WorkbookImport } from "../../types/WorkbookImport";
import Button from "../common/button/btnPrimary/Button";
import Separator from "../common/separator/Separator";
import LoadingCircle from "../loading/LoadingCircle";
import SheetsImport from "../sheet/SheetsImport";
import "./Modal.scss";
import ModalHeader from "./ModalHeader";
import { useForm } from "react-hook-form";
import { importEndpoint } from "../../fetchingAPI/fetchingApi";
import { add } from "../notification/Notifications";
type Props = {
  close: () => void;
  file?: File;
};

export default function Modal({ file, close }: Props) {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  function endPoint(action: string) {
    return `${importEndpoint}/${action}`;
  }
  const loading = !workbookImport;
  const hanleSubmit = async () => {
    try {
      const response = await fetch(endPoint("submit"), {
        method: "POST",
        body: JSON.stringify(workbookImport),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      add("success", "Created successfully");
    } catch (error: Error) {
      add("success", error.message);
      close();
      setWorkbookImport(undefined as any);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file!);
        const resp = await fetch(endPoint("sheet"), {
          method: "POST",
          body: formData,
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.message);
        const result = data.message as WorkbookImport;
        setWorkbookImport(result);
      } catch (error) {
        console.error(error);
        close();
        setWorkbookImport(undefined as any);
      }
    };
    getData();
  }, []);
  return (
    <Fragment>
      <div className={`modal `}>
        <div className="modal-container">
          {loading && (
            <LoadingCircle text="We are processing your request..." />
          )}
          <ModalHeader />
          <Separator title="Infomation of file" />
          <SheetsImport />
          <div className="btn-wrapper">
            <Button
              title="Cancel"
              type="secondary"
              onClick={() => {
                close();
                setWorkbookImport(undefined as any);
              }}
            ></Button>
            <Button title="Create" onClick={hanleSubmit}></Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
