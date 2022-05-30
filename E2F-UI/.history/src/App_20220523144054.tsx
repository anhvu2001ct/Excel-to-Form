import { Outlet } from "react-router-dom";
import Navigate from "./components/navigate";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <Navigate />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
