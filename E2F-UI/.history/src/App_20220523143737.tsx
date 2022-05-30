import { Outlet } from "react-router-dom";
import Navigate from "./components/navigate";

const App = () => {
  return (
    <>
      <Navigate />
      <div className="wrapper">
        <Outlet />
      </div>
    </>
  );
};

export default App;
