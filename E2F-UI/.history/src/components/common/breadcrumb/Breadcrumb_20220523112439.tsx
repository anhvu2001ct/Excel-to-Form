import BreadcrumbImage from "../../../data/img/breadcurmb-img.png";
import "./breadcrumb.scss";
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
        <>
          <div className="bread-direction">
            <i className="fas fa-angle-right"></i>
          </div>
          <span className="bread-title">{item}</span>
        </>
      ))}
    </div>
  );
};

export default Breadcrumb;
