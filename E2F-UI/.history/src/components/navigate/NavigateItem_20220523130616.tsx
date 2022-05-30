import { NavLink } from "react-router-dom";
type Props = {
  title: string;
  icon: string;
  herf?: string;
  position: "left" | "right";
};
const NavigateItem = ({ title, icon, position, herf }: Props) => {
  return (
    <NavLink to={title} className="navigate-item">
      {position === "left" ? (
        <>
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
