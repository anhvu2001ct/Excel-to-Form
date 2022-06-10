import "./WorkbookDetail.scss";
import Separator from "../common/separator/Separator";
import Button from "../common/button/btnPrimary/Button";
import Breadcrumb from "../common/breadcrumb";
import { useEffect, useState } from "react";
import { exportEnpoint, workbookEnpoint } from "../../fetchingAPI/fetchingApi";
import { useNavigate, useParams } from "react-router-dom";
import { Workbook } from "../../types/Wordbook";
import LoadingCircle from "../loading/LoadingCircle";
import SheetDetail from "./SheetDetail";
import DateIcon from "../../data/img/calendar-icon.png";
import DefaultImage from "../../data/img/default-img.webp";

const WorkbookDetail = () => {
  const [workbook, setWorkbook] = useState<Workbook>();
  const { id: workbookId } = useParams();
  const navigate = useNavigate();
  let loading = !workbook;

  useEffect(() => {
    async function GetDetail() {
      const params = new URLSearchParams();
      params.append("id", workbookId!);
      const response = await fetch(`${workbookEnpoint}/get/single?${params}`, {
        method: "GET",
      });
      try {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        const result = data.message;
        setWorkbook(result);
      } catch (error) {
        navigate("/notfound", { replace: true });
      }
    }
    GetDetail();
  }, []);

  const handleExportingOrigin = () => {
    window.location.assign(exportEnpoint + `/origin/${workbookId}`);
  };

  const handleExportingFullData = () => {
    window.location.assign(exportEnpoint + `/full/${workbookId}`);
  };

  return (
    <>
      {loading && <LoadingCircle />}
      <div className="workbook-header">
        <Breadcrumb pages={["Home", "Detail"]} links={["", ""]} />
        <div>
          <Button type="third" onClick={handleExportingOrigin}>
            Export origin
          </Button>
          <Button type="third" onClick={handleExportingFullData}>
            Export workbook
          </Button>
        </div>
      </div>
      <div className="modal-top">
        <img
          src={workbook?.url || DefaultImage}
          alt="hinh"
          className="modal-top-image modal-top-image--detail"
        />
        <div className="modal-top-content">
          <div className="workbook-top-header">
            <div className={`modal-top-title `}>
              <div className="workbook-name">{workbook?.name} </div>
            </div>
            <div className="workbook-top-date">
              <img srcSet={DateIcon} alt="" className="workbook-top-icon" />
              <span className="workbook-top-text">{workbook?.createdAt}</span>
            </div>
          </div>
          <textarea
            className={`modal-top-desc`}
            disabled
            value={workbook?.description}
          ></textarea>
        </div>
      </div>
      <Separator title={"Sheets"} />
      {workbook?.sheets.map((item, index) => (
        <SheetDetail
          key={index}
          sheet={item}
          index={index}
          workbookId={workbookId as unknown as number}
        />
      ))}
    </>
  );
};

export default WorkbookDetail;
