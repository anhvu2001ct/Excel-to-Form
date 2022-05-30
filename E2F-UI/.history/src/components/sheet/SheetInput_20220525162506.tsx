type Props = {
  title: string;
  placeHolder: string;
  value: string | number | undefined;
};
const SheetInput = ({ title, placeHolder, value }: Props) => {
  return (
    <div className="sheet-input">
      <span className="sheet-input-title sheet-name-title">{title}</span>
      <input
        type="text"
        className="sheet-input-number"
        placeholder={placeHolder}
        value={value}
        onChange={}
      />
    </div>
  );
};

export default SheetInput;
