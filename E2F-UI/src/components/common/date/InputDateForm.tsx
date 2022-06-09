import { memo, useRef } from "react";
import { genHTMLId } from "../../../lib/customId";
import "./Date.scss";
interface Props {
  title: string;
  id: string;
  value?: string;
}
export default memo(function InputDateForm({ title, id, value }: Props) {
  const cid = useRef(genHTMLId()).current;
  return (
    <div className="date-container">
      <label className="label" htmlFor={cid}>
        {title}
      </label>
      <input
        type="date"
        id={cid}
        name={id}
        className="date-picker"
        required
        defaultValue={value}
      />
    </div>
  );
});
