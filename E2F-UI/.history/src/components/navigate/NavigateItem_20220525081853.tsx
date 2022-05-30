import { NavLink } from "react-router-dom";
type Props = {
  title: string;
  icon: string;
  href?: string;
  position: "left" | "right";
};

const NavigateItem = ({ title, icon, position, href }: Props) => {
  return (
    <NavLink to={href ?? title} className="navigate-item">
      {position === "left" ? (
        <>
          <label htmlFor="input-file">
            <span className="navigate-item-text">{title}</span>
            <span className="navigate-item-icon">
              <i className={`fal fa-${icon}`}></i>
            </span>
            <input
              type="file"
              id="input-file"
              className="input-file"
              hidden={true}
            />
          </label>
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
