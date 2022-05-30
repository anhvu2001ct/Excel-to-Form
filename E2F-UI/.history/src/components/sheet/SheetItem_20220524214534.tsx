import Button from "../common/button/Button";
import SheetInput from "./SheetInput";
type Props = {
  title: string;
};
const SheetItem = ({ title }: Props) => {
  return (
    <div className="sheet-container">
      <div className="sheet-name">
        <span className="sheet-name-title">Sheet Name</span>
        <h2 className="sheet-name-text">{title}</h2>
      </div>
      <SheetInput
        title="Row number"
        placeHolder="Enter row number,...."
      ></SheetInput>
      <SheetInput
        title="Column start "
        placeHolder="Enter Column number,...."
      ></SheetInput>
      <SheetInput
        title="Column end"
        placeHolder="Enter Column number,...."
      ></SheetInput>
      <Button title="Check" />
    </div>
  );
};

export default SheetItem;
