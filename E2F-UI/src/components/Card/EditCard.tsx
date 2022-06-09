import ReactDom from "react-dom";
import Button from "../common/button/btnPrimary/Button";
import "./EditCard.scss";
import DefaultImage from "../../data/img/background-about.png";
interface IProps {
  onClose: () => void;
  onSave: (title: string, desc: string, imageFile: File) => void;
  workbookUpdate: {
    id: number | undefined;
    name: string | undefined;
    description: string | undefined;
    url: string | undefined;
  };
}
const EditCard = ({ onClose, onSave, workbookUpdate }: IProps) => {
  if (typeof document === "undefined") return null;
  const handleSubmit = (e: React.FormEvent) => {};
  return ReactDom.createPortal(
    <div className="edit">
      <div className="edit-overlay"></div>
      <form className="edit-content" onSubmit={handleSubmit}>
        <h3 className="edit-title">EDIT WORKBOOK</h3>
        <span className="edit-icon" onClick={onClose}>
          <i className="fal fa-times"></i>
        </span>
        <div className="edit-main">
          <div className="edit-input-image">
            <input type="file" name="edit-image" id="edit-image" />
            <img src={DefaultImage} alt="edit-image" />
            <label htmlFor="edit-image" className="edit-label-image">
              <i className="fal fa-upload"></i>
            </label>
          </div>
          <div className="edit-main-content">
            <div className="edit-main-title">
              <input
                type="text"
                name="name"
                placeholder="Enter title workbook"
              />
            </div>
            <textarea
              name="description"
              className="edit-main-desc"
              placeholder="Enter your content here"
            ></textarea>
          </div>
        </div>
        <div className="edit-btn-wrapper">
          <Button title="Save" isFormSubmit={true}></Button>
          <Button title="Cancel" type="secondary" onClick={onClose}></Button>
        </div>
      </form>
    </div>,
    document.querySelector("body") as HTMLBodyElement
  );
};

export default EditCard;
