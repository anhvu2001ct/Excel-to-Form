type Props = {
  title: string;
  placeHolder: string;
};
const SheetInput = () => {
  return (
    <div className="sheet-input">
      <span className="sheet-input-title">Row number</span>
      <input type="text" className="sheet-input-number" />
    </div>
  );
};

export default SheetInput;
