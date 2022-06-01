import { useRef } from "react";
import { genHTMLId } from "../../../lib/customId";
import "./Input.scss";

type Props = {
  onSearch: (name: string) => void;
};

export default function Input({ onSearch }: Props) {
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
          placeholder="Search...."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </>
  );
}
