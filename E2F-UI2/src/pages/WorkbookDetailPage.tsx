import { DownloadOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiEndpoint } from "../API/endpoint";
import ExportViewModal from "../components/modal/ExportViewModal";
import HeaderWorkBook from "../components/modal/HeaderWorkBook";
import SheetDetail from "../components/sheet/SheetDetail";
import {
  useWorkbookSheets,
  WorkbookSheetsProvider,
} from "../context/workbook-context";
import { WorkbookSheets } from "../types/WorkbookSheets";
function _WorkbookDetailPage() {
  return (
    <WorkbookSheetsProvider>
      <WorkbookDetailPage></WorkbookDetailPage>
    </WorkbookSheetsProvider>
  );
}
const WorkbookDetailPage = () => {
  const exportView = useWorkbookSheets();
  const [workbookSheets, setWorkbookSheets] = useState<WorkbookSheets>();
  const [exportActive, setExportActive] = useState(0);
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
  const exportFullData = () => {
    window.location.assign(apiEndpoint(`export/full/${idWorkbook}`));
  };
  const exportOrigin = () => {
    window.location.assign(apiEndpoint(`export/origin/${idWorkbook}`));
  };
  const exportCurrentView = async (exportedView: typeof exportView) => {
    const toastId = toast.loading("We are processing your request");
    try {
      setExportActive(exportActive | 2);
      console.log(exportedView);
      const response = await fetch(
        apiEndpoint("export", "partial", idWorkbook!),
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(exportedView),
        }
      );
      if (!response.ok) throw new Error((await response.json()).message);
      const tempUrl = window.URL.createObjectURL(await response.blob());
      const fileExt = workbookSheets?.workbook.fileName.split(".").pop();
      const a = document.createElement("a");
      a.href = tempUrl;
      a.download = `${workbookSheets?.workbook.name}.${fileExt}`;
      document.body.appendChild(a);
      toast.update(toastId, {
        render: "Your file shall be ready now",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        draggable: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
      a.click();
      a.remove();
      setExportActive(0);
    } catch (_err) {
      const error = _err as Error;
      toast.update(toastId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
        draggable: true,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
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
      {workbookSheets && (
        <>
          <div className="btn-container flex items-center gap-2 justify-end ">
            <Button
              type="primary"
              className="text-blue-500"
              icon={<DownloadOutlined />}
              onClick={() => setExportActive(exportActive | 1)}
            >
              Export view
            </Button>
            <ExportViewModal
              sheets={workbookSheets.sheets}
              visible={(exportActive & 1) != 0}
              loading={(exportActive & 2) != 0}
              onOk={exportCurrentView}
              onCancel={() => setExportActive(exportActive & ~1)}
            />
            <Button
              type="primary"
              className="text-blue-500"
              icon={<DownloadOutlined />}
              onClick={exportFullData}
            >
              Export all
            </Button>
            <Button
              type="primary"
              className="text-blue-500"
              icon={<DownloadOutlined />}
              onClick={exportOrigin}
            >
              Export origin
            </Button>
          </div>
          <div className="w-full mt-3">
            <HeaderWorkBook workbook={workbookSheets.workbook} disable={true} />
            <Divider orientation="left" className="py-4">
              List of sheet
            </Divider>
            <div className="w-full flex flex-col justify-center gap-4">
              {workbookSheets.sheets.map((sheet) => (
                <SheetDetail key={sheet.id} sheet={sheet} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { _WorkbookDetailPage as WorkbookDetailPage };
