type Props = {
  title: string;
  placeHolder: string;
};
const SheetInput = ({ title, placeHolder }: Props) => {
  return (
    <div className="sheet-input">
      <span className="sheet-input-title">{title}</span>
      <input type="text" className="sheet-input-number" />
    </div>
  );
};

export default SheetInput;
