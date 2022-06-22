import { Button, Checkbox, Col, Form, Input, Select } from "antd";
import { toast } from "react-toastify";
import { apiEndpoint } from "../../API/endpoint";
import { Sheet } from "../../types/Sheet";
import { useSheetData } from "../sheet/SheetDetail";
type Props = {
  sheet: Sheet;
};
const FormMain = ({ sheet }: Props) => {
  const [form] = Form.useForm();
  const [_, refreshData] = useSheetData();
  const onFinish = async (values: any) => {
    console.log();
    try {
      const formData = new FormData();
      Object.values(values).forEach((val, index) => {
        formData.append(
          (++index).toString(),
          val === undefined ? "" : (val as string)
        );
      });

      const response = await fetch(apiEndpoint("sheet/add", `${sheet.id}`), {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success(result.message);
      refreshData();
    } catch (_error) {
      const error = _error as Error;
      toast.error(error.message);
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className="w-full max-w-[800px] ">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={onFinish}
        autoComplete="off"
        size="large"
        className="w-full flex flex-col gap-4"
      >
        {sheet.columns.map((col) => {
          return (
            <Form.Item
              name={col.name}
              label={col.name}
              rules={[
                {
                  required: col.isRequired,
                  message: `Please input your ${col.name}!`,
                },
              ]}
              key={col.id}
            >
              {col.columnType === "select" ? (
                <Select
                  className="max-w-[300px]"
                  placeholder={`Enter yout ${col.name}`}
                >
                  {col.selectOptions?.map((select, idx) => (
                    <Select.Option value={select} key={idx}>
                      {select}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Input name={col.name} placeholder={`Enter yout ${col.name}`} />
              )}
            </Form.Item>
          );
        })}
        <Form.Item wrapperCol={{ offset: 4, span: 6 }}>
          <div className="flex items-center gap-2">
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              Submit
            </Button>
            <Button type="default" onClick={onReset} className="text-gray-500">
              Reset
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormMain;
