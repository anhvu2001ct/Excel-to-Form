import { useRef } from "react";
import { genHTMLId } from "../../../lib/customId";
import "./Textarea.scss";
interface Props {
  title: string;
  id: string;
  value?: string;
}
export default function Textarea({ title, id, value }: Props) {
  const cid = useRef(genHTMLId()).current;
  return (
    <div className="textarea-container">
      <label htmlFor={id} className="label">
        {title}
      </label>
      <textarea
        name={id}
        rows={4}
        className="textarea-content"
        placeholder="Enter yout content "
        defaultValue={value}
      ></textarea>
    </div>
  );
}
