import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
type Props = {
  title: string;
  icon: string;
  href?: string;
  position: "left" | "right";
  input?: "file";
};

const NavigateItem = ({ title, icon, position, href, input }: Props) => {
  const [file, setFile] = useState<File>();

  return (
    <Fragment>
      {input && (
        <>
          <label htmlFor="input-file" className="navigate-item">
            <span className="navigate-item-text">{title}</span>
            <span className="navigate-item-icon">
              <i className={`fal fa-${icon}`}></i>
            </span>
          </label>
          <input type="file" id="input-file" />
        </>
      )}
      {!input && (
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
      )}
    </Fragment>
  );
};

export default NavigateItem;
