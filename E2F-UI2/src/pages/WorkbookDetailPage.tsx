import { DownloadOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Collapse, Divider, Tag } from "antd";
import { useEffect, useId } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiEndpoint } from "../API/endpoint";
import HeaderWorkBook from "../components/modal/HeaderWorkBook";
import WorkbookSheet from "../components/workbook/WorkBookItem";
const { Panel } = Collapse;
import {
  useWorkbookSheet,
  WorkbookSheetProvider,
} from "../context/workbook-context";
function _WorkbookDetailPage() {
  return (
    <WorkbookSheetProvider>
      <WorkbookDetailPage></WorkbookDetailPage>;
    </WorkbookSheetProvider>
  );
}
const WorkbookDetailPage = () => {
  const [workbookSheet, setWorkbookSheet] = useWorkbookSheet();
  const param = useParams();
  const idWorkbook = param.id;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          apiEndpoint("workbook", `get/single?id=${idWorkbook}`)
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setWorkbookSheet(result.message);
      } catch (_error) {
        const error = _error as Error;
        toast.error(error.message);
      }
    }
    fetchData();
  }, []);
  const ExportFullData = () => {
    window.location.assign(apiEndpoint(`export/full/${idWorkbook}`));
  };
  const ExportOrigin = () => {
    window.location.assign(apiEndpoint(`export/origin/${idWorkbook}`));
  };
  return (
    <div className="py-4">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/"}>
            <span>Home</span>
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <span>Detail Workbook</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex items-center gap-2 justify-end" key={useId()}>
        <Button
          type="primary"
          className="text-blue-500"
          icon={<DownloadOutlined />}
          onClick={ExportFullData}
        >
          Export all
        </Button>
        <Button
          type="primary"
          className="text-blue-500"
          icon={<DownloadOutlined />}
          onClick={ExportOrigin}
        >
          Export origin
        </Button>
      </div>
      <div className="w-full mt-3">
        <HeaderWorkBook workbook={workbookSheet.workbook} disable={true} />
        <Divider orientation="left" className="py-4">
          List of sheet
        </Divider>
        <div className="w-full flex flex-col justify-center gap-4">
          {workbookSheet.sheets?.map((sheet) => (
            <Collapse
              expandIconPosition={"end"}
              className={`shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]`}
            >
              <Panel
                header={
                  <Tag color="blue">
                    <span className="max-w-[200px] line-clamp-1 text-base">
                      Name
                    </span>
                  </Tag>
                }
                key={sheet.id}
              >
                <WorkbookSheet key={sheet.id} sheet={sheet} />
              </Panel>
            </Collapse>
          ))}
        </div>
      </div>
    </div>
  );
};

export { _WorkbookDetailPage as WorkbookDetailPage };
