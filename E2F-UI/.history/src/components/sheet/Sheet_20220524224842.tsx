import SheetItem from "./SheetItem";
import "./Sheet.scss";
const sheets = ["Member", "Computer", "HardWare"];
const Sheet = () => {
  return (
    <div className="sheet-wrapper">
      {sheets.length > 0 &&
        sheets.map((item) => <SheetItem title="Member" key={item}></SheetItem>)}
    </div>
  );
};

export default Sheet;
