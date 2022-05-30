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
type Props = {
  close: () => void;
  file?: File;
};

export default function Modal({ file, close }: Props) {
  const [workbookImport, setWorkbookImport] = useWorkbookImport();
  const { register, handleSubmit } = useForm<WorkbookImport>();
  function endPoint(action: string) {
    return `http://localhost:5121/api/v1/import/${action}`;
  }
  const loading = !workbookImport;
  const {} = useForm<Props>({
    defaultValues: {},
  });
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
      if (data.success === true) {
        throw new Error(data.message);
      }
    } catch (error) {
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
      <form onSubmit={} className={`modal `}>
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
      </form>
    </Fragment>
  );
}
