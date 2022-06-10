import { useRef } from "react";
import { genHTMLId } from "../../../lib/customId";
import "./Input.scss";

type Props = {
  onSearch: (name: string) => void;
  placeholder?: string;
};

export default function Input({
  onSearch,
  placeholder = "Search by name....",
}: Props) {
  const cid = useRef(genHTMLId()).current;
  return (
    <>
      <div className="search">
        <label htmlFor={cid}>
          <i className="fal fa-search"></i>
        </label>
        <input
          type="text"
          id={cid}
          className="search-input"
          placeholder={placeholder}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </>
  );
}
