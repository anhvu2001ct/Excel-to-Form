import { memo, useRef } from "react";
import { genHTMLId } from "../../../lib/customId";
import "./Select.scss";
interface Props {
  title?: string;
  id?: string;
  addtional?: string[];
  dataKeys?: string[];
  onChange?: (s: string) => void;
}
export default memo(function Select({
  title,
  id,
  addtional,
  dataKeys,
  onChange,
}: Props) {
  const cid = useRef(genHTMLId()).current;
  return (
    <>
      <div className="select-container">
        {title && (
          <label htmlFor={cid} className="label">
            {title}
          </label>
        )}
        <select
          id={cid}
          name={id}
          required
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        >
          {addtional?.map((item, index) => (
            <option key={index} value={dataKeys ? dataKeys[index] : item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
    // <div className={`select-container ${show ? "show" : ""} `} ref={nodeRef}>
    //   <span className="label">{title}</span>
    //   <div className="selected" onClick={(e) => setShow(!show)}>
    //     <span ref={spanRef}>{"Please choice your content"}</span>
    //     <i className="fas fa-caret-right"></i>
    //   </div>
    //   <ul className={`select-list`}>
    //     {addtional.map((item) => (
    //       <li onClick={(e) => handleClick(e, item)} key={item}>
    //         {item}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
});
