import { Fragment, useEffect } from "react";
import { useWorkbookImport } from "../../context/workbookImport-context";
import { WorkbookImport } from "../../types/WorkbookImport";
import Button from "../common/button/btnPrimary/Button";
import Separator from "../common/separator/Separator";
import LoadingCircle from "../loading/LoadingCircle";
import SheetsImport from "../sheet/SheetsImport";
import "./Modal.scss";
import ModalHeader from "./ModalHeader";
type Props = {
  close: () => void;
  file?: File;
};

export default function Modal({ file, close }: Props) {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  function endPoint(action: string) {
    return `http://localhost:5121/api/v1/import/${action}`;
  }
  const loading = !workbookImport;
  const hanleSubmit = () => {
    fetch(endpoint + "/submit");
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
