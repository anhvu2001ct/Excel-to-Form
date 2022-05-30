import "./Input.scss";
export default function Input() {
  return (
    <>
      <div className="search">
        <label htmlFor="">
          <input type="text" className="search" placeholder="Search...." />
        </label>
      </div>
    </>
  );
}
