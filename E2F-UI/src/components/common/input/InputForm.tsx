import { memo, useRef, useState } from "react";
import { genHTMLId } from "../../../lib/customId";
import "./InputForm.scss";
interface Props {
  title: string;
  id: string;
  type: string;
}
export default memo(function InputForm({ title, id, type }: Props) {
  const cid = useRef(genHTMLId()).current;
  return (
    <div className="input-container">
      <label htmlFor={cid} className="label">
        {title}
      </label>
      <input
        type={type}
        name={id}
        id={cid}
        placeholder="enter your content here"
        className="input-form"
      />
    </div>
  );
});
