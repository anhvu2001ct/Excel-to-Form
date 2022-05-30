type Props = {
  title: string;
  placeHolder: string;
  value: string | number | undefined;
  type?: string;
};
const SheetInput = ({ title, placeHolder, value, type }: Props) => {
  return (
    <div className="sheet-input">
      <span className="sheet-input-title sheet-name-title">{title}</span>
      <input
        type={type ?? "text"}
        className="sheet-input-number"
        placeholder={placeHolder}
        value={value}
      />
    </div>
  );
};

export default SheetInput;
