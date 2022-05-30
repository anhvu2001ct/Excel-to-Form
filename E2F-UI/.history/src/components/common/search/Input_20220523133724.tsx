import "./Input.scss";
export default function Input() {
  return (
    <>
      <div className="search">
        <label htmlFor="">
          <i className="fal fa-search"></i>
        </label>
        <input type="text" className="search" placeholder="Search...." />
      </div>
    </>
  );
}
