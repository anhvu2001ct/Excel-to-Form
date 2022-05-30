import { Outlet } from "react-router-dom";
import Navigate from "./components/navigate";

const App = () => {
  return (
    <>
      <Navigate />
      <Outlet />
      <div className="wrapper"></div>
    </>
  );
};

export default App;
