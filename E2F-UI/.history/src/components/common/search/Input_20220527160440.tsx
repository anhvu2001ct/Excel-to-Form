import { useEffect, useState } from "react";
import { workbookEnpoint } from "../../../fetchingAPI/fetchingApi";
import "./Input.scss";

type Props = {
  onSearch: (name: string) => void;
};

export default function Input({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="search">
        <label htmlFor="search-input">
          <i className="fal fa-search"></i>
        </label>
        <input
          type="text"
          id="search-input"
          className="search-input"
          placeholder="Search...."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value)
          }
        />
      </div>
    </>
  );
}
