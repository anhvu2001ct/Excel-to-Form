import SheetInput from "./SheetInput";

const SheetItem = () => {
  return (
    <div className="sheet-container">
      <div className="sheet-name">
        <span className="sheet-name-title">Sheet Name</span>
        <h2 className="sheet-name-text">Member</h2>
      </div>
      <SheetInput></SheetInput>
    </div>
  );
};

export default SheetItem;
