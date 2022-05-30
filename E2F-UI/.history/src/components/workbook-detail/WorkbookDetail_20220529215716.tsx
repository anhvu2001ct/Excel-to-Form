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
                  <th><div className="sheet-table-header">

                     </div>No</th>
                  <th><div className="sheet-table-header">

                     </div>Role</th>
                  <th><div className="sheet-table-header">

                     </div>Account</th>
                  <th><div className="sheet-table-header">

                     </div>Full Name</th>
                  <th><div className="sheet-table-header">

                     </div>Email</th>
                  <th><div className="sheet-table-header">

                     </div>Star Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>PM</td>
                  <td>Anvt456</td>
                  <td>Vo Thanh An</td>
                  <td>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Itaque id molestiae dolorem. Autem unde, ducimus esse vitae
                    laboriosam voluptas praesentium quidem accusantium? Modi,
                    iusto! Fuga omnis iure id possimus quibusdam.
                  </td>
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
