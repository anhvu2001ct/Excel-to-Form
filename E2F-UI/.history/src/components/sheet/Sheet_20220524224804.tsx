import SheetItem from "./SheetItem";
import "./Sheet.scss";
const sheets = ["Member", "Computer", "HardWare"];
const Sheet = () => {
  return (
    <div className="sheet-wrapper">
      <SheetItem title="Member"></SheetItem>
    </div>
  );
};

export default Sheet;
