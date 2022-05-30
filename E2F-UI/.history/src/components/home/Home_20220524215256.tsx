import Cards from "../Card/Cards";
import Breadcrumb from "../common/breadcrumb";
import Input from "../common/search/Input";
import Modal from "../modal/Modal";
import Sheet from "../sheet/Sheet";
import "./Home.scss";
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <Breadcrumb pages={["Home"]} />
        <Input />
      </div>
      <Cards></Cards>
      <Modal></Modal>
    </div>
  );
};

export default Home;
