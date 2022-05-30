import { NavLink } from "react-router-dom";
type Props = {
  title: string;
  icon: string;
  position: "left" | "right";
};
const NavigateItem = ({ title, icon, position }: Props) => {
  return (
    <NavLink to={title} className="navigate-item" style={}>
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
