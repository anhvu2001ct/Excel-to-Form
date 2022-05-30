import ButtonCheck from "../common/button/btnCheck/ButtonCheck";
import Button from "../common/button/btnCheck/ButtonCheck";
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
      <div className="sheet-input-container">
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
      </div>
      <ButtonCheck title="Check" />
    </div>
  );
};

export default SheetItem;
