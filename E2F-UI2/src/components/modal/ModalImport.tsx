import { Button, Divider, Modal } from "antd";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { toast } from "react-toastify";
import { apiEndpoint } from "../../API/endpoint";
import {
  useWorkbookImport,
  WorkbookImportProvider,
} from "../../context/workbookImport-context";
import EventEmiiter from "../../lib/EventEmitter";
import HeaderWorkbook from "./HeaderWorkbook";
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
  const [_wb, setWorkbookImport] = useWorkbookImport();
  const workbook = _wb()!;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    if (loading) toast.info("Please wait untill we are finish");
    else onClose();
  };

  useEffect(() => {
    async function fetchData() {
      const form = new FormData();
      form.append("file", file!);
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint("import", "workbook"), {
          method: "post",
          body: form,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setWorkbookImport(result.message);
        setLoading(false);
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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (!workbook) return null;

  return (
    <Modal
      style={{ top: 10 }}
      title="Import workbook"
      width={"max-content"}
      footer={null}
      visible={!!file}
      onCancel={handleClose}
    >
      <div className="modal-container">
        <HeaderWorkbook workbook={_wb()?.workbook!} />
        <Divider orientation="left">Information of file</Divider>
        <div className="flex flex-col gap-5">
          {workbook!.sheets.map((item) => (
            <SheetImportItem key={nanoid()} sheetImport={item} />
          ))}
        </div>
        <div className="btn-wrapper ">
          <Button
            size="large"
            className="max-w-[120px] w-full"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            className="max-w-[120px] w-full text-blue-500"
            onClick={onSubmit}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export { _ModalImport as Modal, saveEvent };
