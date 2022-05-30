import "./Input.scss";
export default function Input() {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
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
