import { DownloadOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Collapse, Divider } from "antd";
import { useEffect, useId, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiEndpoint } from "../API/endpoint";
import HeaderWorkBook from "../components/modal/HeaderWorkBook";
import SheetDetail from "../components/sheet/SheetDetail";
import {
  useWorkbookSheets,
  WorkbookSheetsProvider,
} from "../context/workbook-context";
import { WorkbookSheets } from "../types/WorkbookSheets";
const { Panel } = Collapse;
function _WorkbookDetailPage() {
  return (
    <WorkbookSheetsProvider>
      <WorkbookDetailPage></WorkbookDetailPage>;
    </WorkbookSheetsProvider>
  );
}
const WorkbookDetailPage = () => {
  const [workbookSheets, setWorkbookSheets] = useState<WorkbookSheets>();
  const exportView = useWorkbookSheets();
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
        const wb = result.message as WorkbookSheets;
        for (const sheet of wb.sheets) {
          exportView[sheet.id] = {
            searchPatterns: {},
          };
        }
        setWorkbookSheets(wb);
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
  const ExportView = async () => {
    try {
      const response = await fetch(
        apiEndpoint("export", "partial", idWorkbook!),
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(exportView),
        }
      );
      if (!response.ok) throw new Error((await response.json()).message);
      const tempUrl = window.URL.createObjectURL(await response.blob());
      const fileExt = workbookSheets?.workbook.fileName.split(".").pop();
      const a = document.createElement("a");
      a.href = tempUrl;
      a.download = `${workbookSheets?.workbook.name}.${fileExt}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (_err) {
      const error = _err as Error;
      toast.error(error.message);
    }
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
      {workbookSheets && (
        <div className="w-full mt-3">
          <HeaderWorkBook workbook={workbookSheets.workbook} disable={true} />
          <Divider orientation="left" className="py-4">
            List of sheet
          </Divider>
          <div className="w-full flex flex-col gap-4">
            {workbookSheets.sheets.map((sheet) => (
              <SheetDetail key={sheet.id} sheet={sheet} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { _WorkbookDetailPage as WorkbookDetailPage };
