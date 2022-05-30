import "./WorkbookDetail.scss";
import Separator from "../common/separator/Separator";
const WorkbookDetail = () => {
  return (
    <>
      <div className="modal-top">
        <img
          src={"https://source.unsplash.com/random"}
          alt="hinh"
          className="modal-top-image modal-top-image--detail"
        />
        <div className="modal-top-content">
          <div className={`modal-top-title `}>
            <input placeholder="Enter title" name="name" />
          </div>
          <textarea
            name="description"
            className={`modal-top-desc`}
            placeholder="Description goes here..."
          ></textarea>
        </div>
      </div>
      <Separator title={"Sheets"} />
      <div className="sheet-detail">
        <div className="sheet-detail-item">
          <span className="sheet-detail-title">About_FPT</span>
          <i className="fas fa-caret-right"></i>
          .
        </div>
      </div>
    </>
  );
};

export default WorkbookDetail;
