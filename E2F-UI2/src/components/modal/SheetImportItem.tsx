import { Button, Form, Input, InputNumber, Tag } from "antd";
import { useState } from "react";
import { apiEndpoint } from "../../API/endpoint";
import { useWorkbookImport } from "../../context/workbookImport-context";
import { SheetImport } from "../../types/SheetImport";
import { toast } from "react-toastify";
import "./SheetImportItem.scss";
type Props = {
  sheetImport: SheetImport;
};

function validRow(value: string) {
  if (value.length) return value.length <= 3 && /^[a-zA-Z]+$/.test(value);
  return true;
}

const SheetImportItem = ({ sheetImport }: Props) => {
  const [workbookImport] = useWorkbookImport();
  const workbook = workbookImport()!.workbook;

  const [startRow, setStartRow] = useState(sheetImport.sheet.headerStartRow);
  const [startCol, setStartCol] = useState(sheetImport.sheet.headerStartCol);
  const [endCol, setEndCol] = useState(sheetImport.sheet.headerEndCol);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint("import", "validate"), {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fileName: workbook.fileName,
          sheetIndex: sheetImport.sheet.sheetIndex,
          headerStartRow: startRow,
          headerStartCol: startCol,
          headerEndCol: endCol,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      const newSheetImport = result.message as SheetImport;
      sheetImport.valid = newSheetImport.valid;
      Object.assign(sheetImport.sheet, newSheetImport.sheet);
      setStartRow(sheetImport.sheet.headerStartRow);
      setStartCol(sheetImport.sheet.headerStartCol);
      setEndCol(sheetImport.sheet.headerEndCol);
    } catch (_error) {
      const error = _error as Error;
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal-sheet-item flex items-end gap-7 border  rounded-md p-4 transition-all duration-300 ${
        !sheetImport.valid ? "border-red-500" : "border-green-400"
      }`}
    >
      <div className="sheet-name max-w-[90px] w-full flex-shrink-1">
        <Form.Item label="Sheet Name" className="font-bold">
          <Tag color="blue">
            <h3 className="text-inherit text-base font-medium max-w-[80px] line-clamp-1">
              {sheetImport.sheet.name}
            </h3>
          </Tag>
        </Form.Item>
      </div>
      <div className="flex-1 flex items-center md:gap-4 gap-2">
        <Form.Item label="Start Row" required>
          <InputNumber
            placeholder="Enter start row"
            min={1}
            onChange={(value) => {
              (sheetImport.valid = false),
                (sheetImport.sheet.headerStartRow = value);
              setStartRow(value);
            }}
            value={startRow}
          />
        </Form.Item>
        <Form.Item label="Start Column" required>
          <Input
            placeholder="Enter start column"
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              if (!validRow(value)) return;
              sheetImport.valid = false;
              sheetImport.sheet.headerStartCol = value;
              setStartCol(value);
            }}
            value={startCol}
          />
        </Form.Item>
        <Form.Item label="End Column" required>
          <Input
            placeholder="Enter end column"
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              if (!validRow(value)) return;
              sheetImport.valid = false;
              sheetImport.sheet.headerEndCol = value;
              setEndCol(value);
            }}
            value={endCol}
          />
        </Form.Item>
      </div>
      <Button
        type="primary"
        loading={loading}
        className="max-w-[100px] w-full text-blue-500"
        onClick={handleCheck}
      >
        Check
      </Button>
    </div>
  );
};

export default SheetImportItem;
