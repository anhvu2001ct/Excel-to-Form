import { Button, Divider, Modal } from "antd";
import Checkbox, { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useMemo, useState } from "react";
import { useWorkbookSheets } from "../../context/workbook-context";
import { Sheet } from "../../types/Sheet";

type Props = {
  visible: boolean;
  loading: boolean;
  sheets: Sheet[];
  onOk: (exported: ReturnType<typeof useWorkbookSheets>) => void;
  onCancel: () => void;
};

export default function ExportViewModal({
  visible,
  loading,
  sheets,
  onOk,
  onCancel,
}: Props) {
  const options = useMemo(
    () =>
      sheets.map((sheet) => ({
        label: sheet.name,
        value: sheet.id,
      })),
    [sheets]
  );

  const exportView = useWorkbookSheets();
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(
    options.map((o) => o.value)
  );

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? options.map((o) => o.value) : []);
  };

  const handleOk = () => {
    const exportedSheets: typeof exportView = {};
    for (const id of checkedList)
      exportedSheets[id as number] = exportView[id as number];
    onOk(exportedSheets);
  };

  return (
    <Modal
      title="Export current view data"
      visible={visible}
      confirmLoading={loading}
      onCancel={onCancel}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={onCancel}
          className="text-blue-500"
        >
          Cancel
        </Button>,
        <Button
          key="link"
          type="primary"
          loading={loading}
          onClick={handleOk}
          className="bg-blue-500"
        >
          Submit
        </Button>,
      ]}
    >
      <Checkbox
        indeterminate={
          checkedList.length > 0 && checkedList.length < options.length
        }
        onChange={onCheckAllChange}
        checked={
          checkedList.length > 0 && checkedList.length === options.length
        }
      >
        Check all
      </Checkbox>
      <Divider />
      <Checkbox.Group
        options={options}
        value={checkedList}
        onChange={onChange}
      />
    </Modal>
  );
}
