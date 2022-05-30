import { Fragment } from "react";
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
    <Fragment>
      {input && (
        <>
          <span className="navigate-item-text">{title}</span>
          <span className="navigate-item-icon">
            <i className={`fal fa-${icon}`}></i>
          </span>
        </>
      )}
      <NavLink to={href ?? title} className="navigate-item">
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
    </Fragment>
  );
};

export default NavigateItem;
