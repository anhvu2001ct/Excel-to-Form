import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputRef,
  message,
  Popconfirm,
  Select,
  Space,
  Table,
} from "antd";
import { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { apiEndpoint } from "../../API/endpoint";
import { useWorkbookSheets } from "../../context/workbook-context";
import { Sheet } from "../../types/Sheet";
import { useSheetData } from "../sheet/SheetDetail";

type Props = {
  sheet: Sheet;
};

function compareStr(a: any, b: any) {
  a = (a ?? "").toString().toLowerCase();
  b = (b ?? "").toString().toLowerCase();
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

function createSelectComp(options: string[], props: any = {}) {
  return (
    <Select {...props}>
      {options.map((val, idx) => (
        <Select.Option key={idx} value={val}>
          {val}
        </Select.Option>
      ))}
    </Select>
  );
}

const TableWorkbook = ({ sheet }: Props) => {
  const [form] = Form.useForm();
  const [data, refreshData] = useSheetData();
  const exportViewData = useWorkbookSheets()[sheet.id];
  const [editingRowId, setEditingRowId] = useState("");
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const searchInputRef = useRef<InputRef>(null);

  let columns = sheet.columns.map<any>((col) => ({
    key: col.id,
    title: col.name,
    dataIndex: col.id,
    width: 200,
    sorter: (a: any, b: any) => compareStr(a[col.id], b[col.id]),
    sortedInfo: sortedInfo.columnKey === col.id ? sortedInfo.order : null,
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 5 }}>
        {col.columnType === "select" ? (
          createSelectComp(col.selectOptions!, {
            value: selectedKeys[0],
            placeholder: "Select to filter",
            onChange: (value: any) => {
              setSelectedKeys(value ? [value] : []);
            },
            style: { width: "100%" },
          })
        ) : (
          <Input
            ref={searchInputRef}
            placeholder={`Search ${col.name}`}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
          />
        )}
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "8px",
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              confirm();
              exportViewData.searchPatterns[col.id] = selectedKeys[0];
            }}
            icon={<SearchOutlined />}
            size="small"
            className="text-blue-500"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm();
              exportViewData.searchPatterns[col.id] = undefined;
            }}
            size="small"
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
    onFilter: (value: string, record: any) => {
      if (col.columnType === "select")
        return record[col.id].toString() === value;
      return (record[col.id] ?? "")
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
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
      data?.map((row) => {
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
    const result: Record<string, Record<string, number>> = {};
    data?.forEach((row) => {
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
      fixed: "right",
      render: (_: any, record: any) => {
        return (
          <div className="flex items-center">
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
                  <EditOutlined />
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
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
              </>
            ) : (
              <>
                <Button type="link" onClick={() => updateRow(record.key)}>
                  <CheckOutlined />
                </Button>
                <Button
                  type="link"
                  className="text-red-500"
                  onClick={() => {
                    setEditingRowId("");
                  }}
                >
                  <CloseOutlined />
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        loading={data === undefined}
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={{
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total}`,
        }}
        scroll={{ x: "max-content", y: 1000 }}
        onChange={(_1, _2, sorter: any) => {
          setSortedInfo(sorter);
          exportViewData.sorting = sorter.order
            ? {
                columnId: sorter.columnKey,
                order: sorter.order === "ascend" ? "asc" : "desc",
              }
            : undefined;
        }}
      />
    </Form>
  );
};

export default TableWorkbook;
