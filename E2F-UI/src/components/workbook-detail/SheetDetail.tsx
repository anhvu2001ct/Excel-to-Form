import { useRef, useState } from "react";
import { sheetEnpoint } from "../../fetchingAPI/fetchingApi";
import { Sheet, SheetRow } from "../../types/Wordbook";
import Input from "../common/search/Input";
import Select from "../common/select/Select";
import Separator from "../common/separator/Separator";
import Table from "../common/table/Table";
import Form from "../Form/Form";
import { add } from "../notification/Notifications";

type Props = {
  sheet: Sheet;
  workbookId: number;
  index: number;
};
export default function SheetDetail({ sheet, index, workbookId }: Props) {
  const [active, setActive] = useState(false);
  const [sheetData, setSheetData] = useState<SheetRow[]>();
  const searchDataRef = useRef<[string, string]>(["", ""]);
  let searchData = searchDataRef.current;

  const updateData = async () => {
    try {
      const params = new URLSearchParams();
      params.append("workbookId", String(workbookId));
      params.append("sheetId", String(index));
      if (searchData[1]) {
        params.append("pattern", searchData[0]);
        params.append("column", searchData[1]);
      }
      const response = await fetch(
        sheetEnpoint + `/${searchData[1] ? "search" : "get"}?${params}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!data.status) throw new Error(data.message);
      const result = data.message;
      setSheetData(result as any);
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = () => {
    setActive((prevState) => {
      const newState = !prevState;
      if (newState && sheetData == undefined) updateData();
      return newState;
    });
  };

  const handleSearchData = (pattern: string, column: string) => {
    searchDataRef.current = [pattern, column];
    searchData = searchDataRef.current;
    updateData();
  };

  return (
    <div className="sheet-detail" key={index}>
      <div className="sheet-detail-header" onClick={toggle}>
        <span className="sheet-detail-title">{sheet.name}</span>
        <i className="fas fa-caret-right"></i>
      </div>
      <div className={`sheet-main ${active ? "active" : ""}`}>
        <div className="sheet-main-content">
          <div className="sheet-detail-search">
            <Input
              placeholder="Search by content..."
              onSearch={(str) => handleSearchData(str, searchData[1])}
            />
            <Select
              addtional={[
                "Select filter column",
                ...sheet.columns.map((item) => item.name),
              ]}
              dataKeys={["", ...sheet.columns.map((item) => item.id)]}
              onChange={(str) => handleSearchData(searchData[0], str)}
            />
          </div>
          <Table
            columns={sheet.columns}
            sheetData={sheetData}
            refreshData={updateData}
            workbookId={workbookId}
            sheetId={index}
          />
          <Separator title="Form" />
          <Form
            workbookId={workbookId}
            sheetId={index}
            columns={sheet.columns}
            onSubmit={updateData}
          />
        </div>
      </div>
    </div>
  );
}
