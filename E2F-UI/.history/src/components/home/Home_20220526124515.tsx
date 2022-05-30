import Cards from "../Card/Cards";
import Breadcrumb from "../common/breadcrumb";
import Input from "../common/search/Input";
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <Breadcrumb pages={["Home"]} />
        <Input />
      </div>
      <Cards></Cards>
    </div>
  );
};

export default Home;
