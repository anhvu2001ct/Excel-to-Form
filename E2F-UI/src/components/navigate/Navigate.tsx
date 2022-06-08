import { Outlet } from "react-router-dom";
import logo from "../../data/img/logo-img.png";
import "./Navigate.scss";
import NavigateBottom from "./NavigateBottom";
import NavigateMain from "./NavigateMain";
const Navigate = () => {
  return (
    <>
      <div className="navigate-container">
        <div className="navigate">
          <img srcSet={`${logo} 2x`} alt="" className="navigate-logo" />
          <div>
            <NavigateMain />
            <hr></hr>
            <NavigateBottom />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigate;