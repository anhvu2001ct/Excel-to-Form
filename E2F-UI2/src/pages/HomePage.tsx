import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import WorkbookCards from "../components/card/Index";

const HomePage = () => {
  return (
    <>
      <div className="py-4">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={"/"} className="flex items-center gap-2 ">
              <span>Home</span>
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <WorkbookCards />
      </div>
    </>
  );
};

export default HomePage;
