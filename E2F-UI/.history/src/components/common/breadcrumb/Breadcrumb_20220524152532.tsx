import { Fragment } from "react";
import BreadcrumbImage from "../../../data/img/breadcurmb-img.png";
import "./Breadcrumb.scss";
type Props = {
  pages: string[];
};

const Breadcrumb = ({ pages }: Props) => {
  return (
    <div className="bread-container">
      <div className="bread-img">
        <img srcSet={`${BreadcrumbImage} 2x`} />
      </div>
      {pages.map((item) => (
        <Fragment key={item}>
          <div className="bread-direction">
            <i className="fas fa-angle-right"></i>
          </div>
          <span className="bread-title">{item}</span>
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
