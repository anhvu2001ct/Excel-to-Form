import BreadcrumbImage from "../../data/img/breadcurmb-img.png";

type Props = {
  
}


const Breadcrumb = () => {
  return (
    <div>
      <div className="bread-img">
        <img srcSet={`${Breadcrumb} 2x`} />
      </div>
      <div className="bread-icon">
        <i className="far fa-angle-right"></i>
      </div>
      <span className="bread-title"></span>
    </div>
  );
};

export default Breadcrumb;
