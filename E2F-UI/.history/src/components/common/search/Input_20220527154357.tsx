import { workbookEnpoint } from "../../../fetchingAPI/fetchingApi";
import "./Input.scss";
export default function Input() {
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams();
    params.append("name",e.target.value)
    const reponse = fetch(`${workbookEnpoint}/search`, {
      body: ,
    });
  };
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
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </>
  );
}
