import Breadcrumb from "../common/breadcrumb";

const Home = () => {
  return (
    <div className="home-container">
      <Breadcrumb pages={["Home", "Detail"]} />
    </div>
  );
};

export default Home;
