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

let subscriber: (() => void)[] = [];
function emit() {
  for (const trigger of subscriber) trigger();
}

function subscribe(trigger: () => void) {
  subscriber.push(trigger);
}

function unSubcribe(trigger: () => void) {
  subscriber = subscriber.filter((s) => s != trigger);
}

function Modal({ file, close }: Props) {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  function endPoint(action: string) {
    return `${importEndpoint}/${action}`;
  }
  const loading = !workbookImport;
  const hanleSubmit = async () => {
    try {
      if (!workbookImport.name) throw new Error("Name can't be empty");
      if (!workbookImport.description)
        throw new Error("Description can't be empty");
      for (const sheet of workbookImport.sheets) {
        if (!sheet.valid) throw new Error("Input is not valid");
      }
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
      emit();
      close();
    } catch (_e) {
      const e = _e as Error;
      add("error", e.message);
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
      }
    };
    getData();
  }, []);
  return (
    <Fragment>
      <div className={`modal `}>
        <div className="modal-container">
          <ModalHeader />
          {loading && (
            <LoadingCircle text="We are processing your request..." />
          )}
          <Separator title="Infomation of file" />
          <SheetsImport />
          <div className="btn-wrapper">
            <Button
              title="Cancel"
              type="secondary"
              onClick={() => {
                close();
              }}
            ></Button>
            <Button title="Create" onClick={hanleSubmit}></Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export { Modal, subscribe };
