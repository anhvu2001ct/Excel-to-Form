import { Col, Row } from "antd";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { apiEndpoint } from "../../API/endpoint";
import { Workbook } from "../../types/Workbook";
import { saveEvent } from "../modal/ModalImport";
import SearchInput from "../search/SearchInput";
import CardItem from "./CardItem";

const WorkbookCardsContext = createContext(() => {});

const WorkbookCards = () => {
  const [workbook, setWorkbook] = useState<Workbook[]>();
  const searchRef = useRef("");

  const refreshData = () => {
    updateData(searchRef.current);
  };

  useEffect(() => {
    saveEvent.subscribe(refreshData);
    updateData("");
    return () => saveEvent.unSubscribe(refreshData);
  }, []);

  const updateData = async (value: string) => {
    searchRef.current = value;
    try {
      let response = null;
      if (!value) response = await fetch(apiEndpoint("workbook", "get/all"));
      else {
        const params = new URLSearchParams();
        params.append("name", value);
        response = await fetch(
          apiEndpoint("workbook", `search/name?${params}`)
        );
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setWorkbook(result.message);
    } catch (_error) {
      const error = _error as Error;
      toast.error(error.message);
    }
  };

  return (
    <div>
      <SearchInput onSearch={updateData} />
      <WorkbookCardsContext.Provider value={refreshData}>
        <Row gutter={[24, 24]}>
          {workbook?.map((item) => (
            <Col span={6} key={item.id}>
              <CardItem data={item} />
            </Col>
          ))}
        </Row>
      </WorkbookCardsContext.Provider>
    </div>
  );
};

export default WorkbookCards;
export function useWorkbooksRefresh() {
  const context = useContext(WorkbookCardsContext);
  return context;
}
