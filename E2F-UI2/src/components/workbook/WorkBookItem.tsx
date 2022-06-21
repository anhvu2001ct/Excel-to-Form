import { CaretDownOutlined } from "@ant-design/icons";
import { Col, Row, Tag } from "antd";
import { Sheet } from "../../types/Sheet";
import TableWorkBook from "../table/TableWorkBook";
type Props = {
  sheet: Sheet;
};
const WorkbookSheet = ({ sheet }: Props) => {
  return (
    <Row>
      <Col span={24}>
        <div className="flex flex-col gap-2">
          <div className="w-full flex items-center justify-between p-3 bg-white shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] rounded-sm cursor-pointer">
            <Tag color="orange">
              <span className="max-w-[200px] line-clamp-1 text-base">
                {sheet.name}
              </span>
            </Tag>
            <CaretDownOutlined />
          </div>
          <div className="w-full p-3 bg-white rounded-sm shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]">
            <TableWorkBook sheet={sheet} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default WorkbookSheet;
