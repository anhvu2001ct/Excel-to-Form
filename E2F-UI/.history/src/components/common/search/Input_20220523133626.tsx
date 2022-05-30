import "./Input.scss";
export default function Input() {
  return (
    <>
      <div className="search">
        <i class="fal fa-search"></i>
        <label htmlFor=""></label>
        <input type="text" className="search" placeholder="Search...." />
      </div>
    </>
  );
}
