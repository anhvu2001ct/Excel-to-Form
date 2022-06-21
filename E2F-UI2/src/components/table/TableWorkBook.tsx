import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputRef,
  message,
  Select,
  Space,
  Table,
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { apiEndpoint } from "../../API/endpoint";
import { Sheet } from "../../types/Sheet";
import { SheetColumn } from "../../types/SheetColumn";
import { SheetRow } from "../../types/SheetRow";

interface DataType {
  key: React.Key | number;
}
type Props = {
  sheet: Sheet;
};

function compareStr(a: any, b: any) {
  (a = a.toString().toLowerCase()), (b = b.toString().toLowerCase());
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

function createSelectComp(options: string[]) {
  return (
    <Select>
      {options.map((val, idx) => (
        <Select.Option key={idx} value={val}>
          {val}
        </Select.Option>
      ))}
    </Select>
  );
}

const TableWorkBook = ({ sheet }: Props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<object[]>([]);
  const searchInputRef = useRef<InputRef>(null);
  const [editingRowId, setEditingRowId] = useState("");

  let columns = sheet.columns.map<any>((col) => ({
    key: col.id,
    title: col.name,
    dataIndex: col.id,
    width: 200,
    sorter: (a: any, b: any) => compareStr(a[col.id], b[col.id]),
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder={`Search ${col.name}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm({ closeDropdown: false })}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && clearFilters();
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInputRef.current?.select(), 100);
      }
    },
    onFilter: (value: string, record: any) =>
      record[col.id]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: (text: string, record: any) => {
      if (editingRowId === record.key) {
        const inputNode =
          col.columnType === "select" ? (
            createSelectComp(col.selectOptions!)
          ) : (
            <Input />
          );
        return (
          <Form.Item
            name={col.id}
            rules={[
              {
                required: col.isRequired,
                message: "Please fill this field",
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        );
      } else {
        return <p>{text}</p>;
      }
    },
  }));

  columns = [
    ...columns,
    {
      key: "action",
      title: "Actions",
      dataIndex: "action",
      render: (_: any, record: any) => {
        return (
          <div className="flex items-center gap-2 p-3">
            {editingRowId !== record.key ? (
              <>
                <Button
                  type="link"
                  disabled={editingRowId != ""}
                  onClick={() => {
                    setEditingRowId(record.key);
                    form.setFieldsValue({
                      ...record,
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  type="link"
                  style={{
                    color: "red",
                  }}
                >
                  Remove
                </Button>
              </>
            ) : (
              <>
                <Button type="link" htmlType="submit">
                  Save
                </Button>
                <Button
                  type="link"
                  className="text-red-500"
                  onClick={() => {
                    setEditingRowId("");
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams();
        params.append("sheetId", sheet.id.toString());
        const response = await fetch(
          apiEndpoint("sheet", `get/data?${params}`)
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        const _data = result.message as SheetRow[];
        setData(
          _data.map((row) => {
            const result: any = {
              key: row.id,
            };
            row.fields.forEach(
              (f, idx) => (result[columns[idx].dataIndex] = f.value)
            );
            return result;
          })
        );
      } catch (error) {}
    }
    fetchData();
  }, []);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content", y: 500 }}
      />
    </Form>
  );
};

export default TableWorkBook;
