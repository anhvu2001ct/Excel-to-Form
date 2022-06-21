import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputRef,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
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

type MappingType = {
  [key: string]: {
    [key2: string]: number;
  };
};

const TableWorkBook = ({ sheet }: Props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<SheetRow[]>([]);
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

  const dataSource = useMemo(
    () =>
      data.map((row) => {
        const result: any = {
          key: row.id,
        };
        row.fields.forEach(
          (f, idx) => (result[columns[idx].dataIndex] = f.value)
        );
        return result;
      }),
    [data]
  );

  const idMapping = useMemo(() => {
    const result: MappingType = {};
    data.forEach((row) => {
      result[row.id] = {} as any;
      columns.forEach(
        (col, idx) => (result[row.id][col.key] = row.fields[idx].id)
      );
    });
    return result;
  }, [data]);

  const updateRow = async (id: number) => {
    const values = await form.validateFields();
    const formData = new FormData();
    for (const cid in values) {
      if (!(cid in idMapping[id]) || values[cid] == null) continue;
      const fid = idMapping[id][cid];
      formData.append(fid.toString(), values[cid]);
    }

    try {
      const response = await fetch(apiEndpoint("sheet", "edit", "data"), {
        method: "PUT",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      refreshData();
      setEditingRowId("");
      message.info(`Edited a row in sheet ${sheet.name}`);
    } catch (_error) {
      const error = _error as Error;
      toast.error(error.message);
    }
  };

  const deleteRow = async (id: number) => {
    try {
      const response = await fetch(
        apiEndpoint("sheet", "delete", "row", id.toString()),
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      refreshData();
      setEditingRowId("");
      message.success(`Deleted a row in sheet ${sheet.name}`);
    } catch (_error) {
      const error = _error as Error;
      toast.error(error.message);
    }
  };

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
                <Popconfirm
                  title="Are you sure want to delete this?"
                  onConfirm={() => deleteRow(record.key)}
                  okText={
                    <span className="text-blue-500 transition-all hover:text-white">
                      Yes
                    </span>
                  }
                  cancelText="No"
                >
                  <Button
                    type="link"
                    style={{
                      color: "red",
                    }}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </>
            ) : (
              <>
                <Button type="link" onClick={() => updateRow(record.key)}>
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

  const refreshData = async () => {
    try {
      const params = new URLSearchParams();
      params.append("sheetId", sheet.id.toString());
      const response = await fetch(apiEndpoint("sheet", `get/data?${params}`));
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setData(result.message);
    } catch (_error) {
      const error = _error as Error;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Form form={form} component={false}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content", y: 500 }}
      />
    </Form>
  );
};

export default TableWorkBook;
