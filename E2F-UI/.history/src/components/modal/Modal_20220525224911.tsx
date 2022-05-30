import { Fragment, useEffect } from "react";
import { useWorkbookImport } from "../../context/workbookImport-context";
import useClickOutSide from "../../hooks/useClickOutSide";
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
  const { show, setShow, nodeRef } = useClickOutSide();
  const formData = new FormData();
  formData.append("file", file!);
  const endpoint = `http://localhost:5121/api/v1/import/sheet`;
  const loading = !workbookImport;
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
      {loading ? (
        <LoadingCircle></LoadingCircle>
      ) : (
        <div className={`modal ${show ? "disable" : ""}`} ref={nodeRef}>
          <div className="overlay"></div>
          <div className="modal-container">
            <ModalHeader />
            <Separator title="Infomation of file" />
            <SheetsImport />
            <div className="btn-wrapper">
              <Button
                title="Cancel"
                onClick={() => {
                  setShow(!show);
                  close();
        setWorkbookImport(undefined as any);
                }}
                type="secondary"
              ></Button>
              <Button title="Create"></Button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
