import { Button, Divider, Modal } from "antd";
import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { toast } from "react-toastify";
import { apiEndpoint } from "../../API/endpoint";
import {
  useWorkbookImport,
  WorkbookImportProvider,
} from "../../context/workbookImport-context";
import EventEmiiter from "../../lib/EventEmitter";
import HeaderWorkbook from "./HeaderWorkBook";
import "./Modal.scss";
import SheetImportItem from "./SheetImportItem";
type Props = {
  file?: File;
  onClose: () => void;
};
const saveEvent = new EventEmiiter();

function _ModalImport(props: Props) {
  return (
    <WorkbookImportProvider>
      <ModalImport {...props} />
    </WorkbookImportProvider>
  );
}
function ModalImport({ onClose, file }: Props) {
  const [_, rerender] = useState({});
  const [_wb, setWorkbookImport] = useWorkbookImport();
  const workbook = _wb()!;
  useEffect(() => {
    async function fetchData() {
      const form = new FormData();
      form.append("file", file!);
      try {
        const response = await fetch(apiEndpoint("import", "workbook"), {
          method: "post",
          body: form,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setWorkbookImport(result.message);
        rerender({});
      } catch (error) {
        const _error = error as Error;
        toast.error(_error.message);
        onClose();
      }
    }
    if (file) fetchData();
  }, [file]);

  const onSubmit = async () => {
    try {
      const response = await fetch(apiEndpoint("import", "submit"), {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(_wb()),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success("Created succesfully");
      saveEvent.emit(undefined);
      onClose();
    } catch (_error) {
      const error = _error as Error;
      toast.error(error.message);
    }
  };

  if (!workbook) return null;

  return ReactDom.createPortal(
    <Modal
      style={{ top: 10 }}
      title="Import workbook"
      width={"max-content"}
      footer={null}
      visible={!!file}
      onCancel={onClose}
    >
      <div className="modal-container">
        <HeaderWorkbook workbook={_wb()?.workbook!} />
        <Divider orientation="left">Information of file</Divider>
        <div className="flex flex-col gap-5">
          {workbook!.sheets.map((item, index) => (
            <SheetImportItem key={index} index={index} />
          ))}
        </div>
        
        <div className="btn-wrapper ">
          <Button
            size="large"
            className="max-w-[120px] w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            className="max-w-[120px] w-full text-blue-500"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>,
    document.querySelector("body") as HTMLElement
  );
}

export { _ModalImport as Modal, saveEvent };
