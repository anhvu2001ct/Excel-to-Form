import "./Modal.scss";
export default function Modal() {
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-container">
        <div className="modal-top">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="modal-top-image"
          />
          <div className="modal-top-content">
            <div className="modal-top-title">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              aperiam in inventore, deserunt iure nostrum, beatae minus fugit
              non tempora impedit praesentium laudantium accusantium cum vitae
              neque, ab asperiores modi?
            </div>
            <textarea className="modal-top-desc">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
              similique dolorem fugiat voluptatem tempore neque ipsa. Sint id
              dolor non ullam! Reprehenderit qui provident reiciendis tempore
              deleniti in, distinctio cupiditate.
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
