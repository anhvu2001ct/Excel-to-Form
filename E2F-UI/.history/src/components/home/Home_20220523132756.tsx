import Breadcrumb from "../common/breadcrumb";
import Input from "../common/search/Input";
import "./Home.scss";
const Home = () => {
  return (
    <div className="home-container">
      <Breadcrumb pages={["Home"]} />
      <Input />
    </div>
  );
};

export default Home;
