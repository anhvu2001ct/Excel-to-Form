type Props = {
  title: string;
  placeHolder: string;
  value: string | number | undefined;
  type: number;
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
      />
    </div>
  );
};

export default SheetInput;
