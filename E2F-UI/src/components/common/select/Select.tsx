import { memo, useRef } from "react";
import { genHTMLId } from "../../../lib/customId";
import "./Select.scss";
interface Props {
  title?: string;
  id?: string;
  addtional?: string[];
  dataKeys?: string[];
  onChange?: (s: string) => void;
  value?: string;
}
export default memo(function Select({
  title,
  id,
  addtional,
  dataKeys,
  onChange,
  value,
}: Props) {
  const cid = useRef(genHTMLId()).current;
  return (
    <>
      <div className="select-container">
        {title && (
          <label htmlFor={cid} className="label">
            {title}
          </label>
        )}
        <select
          id={cid}
          name={id}
          required
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
          defaultValue={value}
        >
          {addtional?.map((item, index) => (
            <option key={index} value={dataKeys ? dataKeys[index] : item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
});
