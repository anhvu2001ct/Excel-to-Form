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
          <div className="sheet-detail-header">
            <span className="sheet-detail-title">About_FPT</span>
            <i className="fas fa-caret-right"></i>
          </div>
          <div className="sheet-detail-content">
            <table className="sheet-detail-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Role</th>
                  <th>Account</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Star Date</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Star Date</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Star Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>PM</td>
                  <td>Anvt456</td>
                  <td>Vo Thanh An</td>
                  <td>An22@gmail.com</td>
                  <td>1/1/2022</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkbookDetail;
