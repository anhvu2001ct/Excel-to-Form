import BreadcrumbImage from "../../data/img/breadcurmb-img.png";

const Breadcrumb = () => {
  return (
    <div>
      <div className="bread-img">
        <img srcSet={`${Breadcrumb} 2x`} />
      </div>
      <div className="bread-icon">
        
      </div>
    </div>
  );
};

export default Breadcrumb;
