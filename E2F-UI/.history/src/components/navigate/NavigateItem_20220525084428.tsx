import { NavLink } from "react-router-dom";
type Props = {
  title: string;
  icon: string;
  href?: string;
  position: "left" | "right";
  input?: "file";
};

const NavigateItem = ({ title, icon, position, href, input }: Props) => {
  return (
    <NavLink to={href ?? title} className="navigate-item">
      {position === "left" ? (
        <>
          <label htmlFor="input-file"></label>
          <input type="file" name="input-file" id="" />
          <span className="navigate-item-text">{title}</span>
          <span className="navigate-item-icon">
            <i className={`fal fa-${icon}`}></i>
          </span>
        </>
      ) : (
        <>
          <span className="navigate-item-icon">
            <i className={`fal fa-${icon}`}></i>
          </span>
          <span className="navigate-item-text">{title}</span>
        </>
      )}
    </NavLink>
  );
};

export default NavigateItem;
