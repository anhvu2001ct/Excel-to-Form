type Props = {
  title: string;
  placeHolder: string;
};
const SheetInput = ({ title, placeHolder }: Props) => {
  return (
    <div className="sheet-input">
      <span className="sheet-input-title sheet-name-title">{title}</span>
      <input
        type="text"
        className="sheet-input-number"
        placeholder={placeHolder}
      />
    </div>
  );
};

export default SheetInput;
