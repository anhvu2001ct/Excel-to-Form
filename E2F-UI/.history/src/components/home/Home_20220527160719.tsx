import { useState } from "react";
import Cards from "../Card/Cards";
import Breadcrumb from "../common/breadcrumb";
import Input from "../common/search/Input";
import "./Home.scss";
const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="home-container">
      <div className="home-header">
        <Breadcrumb pages={["Home"]} />
        <Input onSearch={(name) => setSearch(name)} />
      </div>
      <Cards search={search} />
    </div>
  );
};

export default Home;
