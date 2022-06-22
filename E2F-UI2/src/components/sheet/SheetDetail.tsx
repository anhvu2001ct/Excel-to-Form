import { Col, Collapse, Row, Tag } from "antd";
import { createContext, useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { apiEndpoint } from "../../API/endpoint";
import { Sheet } from "../../types/Sheet";
import { SheetRow } from "../../types/SheetRow";
import FormMain from "../form/FormMain";
import TableWorkbook from "../table/TableWorkbook";

type Props = {
  sheet: Sheet;
};

type SheetDataContextType = [SheetRow[] | undefined, () => void];

const sheetDataContext = createContext<SheetDataContextType>([] as any);

export default function SheetDetail({ sheet }: Props) {
  const [data, setData] = useState<SheetRow[]>();
  const alreadyOpened = useRef(false);

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

  const handleChange = (keyList: any) => {
    if (keyList.length && !alreadyOpened.current) {
      alreadyOpened.current = true;
      refreshData();
    }
  };

  return (
    <Collapse
      key={sheet.id}
      expandIconPosition={"end"}
      className={`shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]`}
      onChange={handleChange}
    >
      <Collapse.Panel
        header={
          <Tag color="blue">
            <span className="max-w-[200px] line-clamp-1 text-base">Name</span>
          </Tag>
        }
        key={sheet.id}
      >
        <sheetDataContext.Provider value={[data, refreshData]}>
          <Row>
            <Col span={24}>
              <div className="flex flex-col gap-2">
                <TableWorkbook sheet={sheet} />
                <FormMain />
              </div>
            </Col>
          </Row>
        </sheetDataContext.Provider>
      </Collapse.Panel>
    </Collapse>
  );
}

export const useSheetData = () => {
  return useContext(sheetDataContext);
};
