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
                  <th>
                    <div className="sheet-table-header">No</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Role</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Account</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Full Name</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Email</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Star Date</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">No</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Role</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Account</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Full Name</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Email</div>
                  </th>
                  <th>
                    <div className="sheet-table-header">Star Date</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="sheet-table-content">1</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">PM</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Anvt456</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Vo Thanh An</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Lorem</div>
                  </td>
                  <td>
                    <div className="sheet-table-content"></div>1/1/2022
                  </td>
                  <td>
                    <div className="sheet-table-content">1</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">PM</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Exercitationem tempore cupiditate repudiandae est. Enim
                      tempora minus, reprehenderit quo laboriosam quidem velit
                      ab iure distinctio! Officiis ipsam totam omnis iusto sed.
                    </div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Vo Thanh An</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Lorem</div>
                  </td>
                  <td>
                    <div className="sheet-table-content"></div>1/1/2022
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="sheet-table-content">1</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">PM</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Anvt456</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Vo Thanh An</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Lorem</div>
                  </td>
                  <td>
                    <div className="sheet-table-content"></div>1/1/2022
                  </td>
                  <td>
                    <div className="sheet-table-content">1</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">PM</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Anvt456</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Vo Thanh An</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Lorem</div>
                  </td>
                  <td>
                    <div className="sheet-table-content"></div>1/1/2022
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="sheet-table-content">1</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">PM</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Anvt456</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Vo Thanh An</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Lorem</div>
                  </td>
                  <td>
                    <div className="sheet-table-content"></div>1/1/2022
                  </td>
                  <td>
                    <div className="sheet-table-content">1</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">PM</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Anvt456</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Vo Thanh An</div>
                  </td>
                  <td>
                    <div className="sheet-table-content">Lorem</div>
                  </td>
                  <td>
                    <div className="sheet-table-content"></div>1/1/2022
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Separator title="Form" />
          <form action="#" className="sheet-form">
            <label htmlFor=""></label>
            <div className="select-container">
              <div className="selected">
                <span>Title</span>
                <i className="fas fa-caret-right"></i>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WorkbookDetail;
