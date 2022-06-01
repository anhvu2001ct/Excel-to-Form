import { Fragment } from "react";
import { Link } from "react-router-dom";
import BreadcrumbImage from "../../../data/img/breadcurmb-img.png";
import "./Breadcrumb.scss";
type Props = {
  pages: string[];
  links: string[];
};

const Breadcrumb = ({ pages, links }: Props) => {
  return (
    <div className="bread-container">
      <div className="bread-img">
        <img srcSet={`${BreadcrumbImage} 2x`} />
      </div>
      {pages.map((item, index) => (
        <Fragment key={item}>
          <div className="bread-direction">
            <i className="fas fa-angle-right"></i>
          </div>
          <span
            className={`bread-title ${
              index === pages.length - 1 ? "bold" : ""
            }`}
          >
            {index < pages.length - 1 ? (
              <Link to={`/${links[index]}`}>{item}</Link>
            ) : (
              item
            )}
          </span>
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
