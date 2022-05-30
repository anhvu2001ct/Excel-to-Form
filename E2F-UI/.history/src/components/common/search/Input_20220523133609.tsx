import "./Input.scss";
export default function Input() {
  return (
    <>
      <div className="search">
        <i class="fal fa-search"></i>
      </div>
      <input type="text" className="search" placeholder="Search...." />
    </>
  );
}
