import Button from "../common/button/Button";
import SheetInput from "./SheetInput";
type Props = {
  title: string;
};
const SheetItem = ({ title }: Props) => {
  return (
    <div className="sheet-item">
      <div className="sheet-name">
        <span className="sheet-name-title">Sheet Name</span>
        <h2 className="sheet-name-text">{title}</h2>
      </div>
      .
      <Button title="Check" />
    </div>
  );
};

export default SheetItem;
