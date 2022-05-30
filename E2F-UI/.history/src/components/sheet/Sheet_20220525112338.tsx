import SheetItem from "./SheetItem";
import "./Sheet.scss";
import Button from "../common/button/btnPrimary/Button";
import useClickOutSide from "../../hooks/useClickOutSide";
const sheets = ["MemberMemberMemberMemberMemberMember", "Computer", "HardWare"];
type Props = {
  sheets: [];
};
const Sheet = ({ sheetImport }) => {
  return (
    <div className="sheet-wrapper">
      {sheets.length > 0 &&
        sheets.map((item) => <SheetItem title={item} key={item}></SheetItem>)}
      <div className="btn-wrapper">
        <Button title="Cancel" type="secondary"></Button>
        <Button title="Create"></Button>
      </div>
    </div>
  );
};

export default Sheet;
