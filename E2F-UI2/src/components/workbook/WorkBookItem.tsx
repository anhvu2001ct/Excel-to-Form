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
          <TableWorkBook sheet={sheet} />
        </div>
      </Col>
    </Row>
  );
};

export default WorkbookSheet;
