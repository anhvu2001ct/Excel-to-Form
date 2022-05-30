import BreadcrumbImage from "../../data/img/breadcurmb-img.png";

type Props = {
  pages: string[];
};

const Breadcrumb = ({ pages }: Props) => {
  return (
    <div>
      <div className="bread-img">
        <img srcSet={`${Breadcrumb} 2x`} />
      </div>
      {pages.map((item) => (
        <>
          <div className="bread-icon"></div>
          <span className="bread-title"></span>
        </>
      ))}
    </div>
  );
};

export default Breadcrumb;
