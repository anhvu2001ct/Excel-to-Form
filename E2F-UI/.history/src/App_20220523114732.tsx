import { Outlet } from "react-router-dom";
import Navigate from "./components/navigate";

const App = () => {
  return (
    <div className="wrapper">
      <Navigate />
      <Outlet />
    </div>
  );
};

export default App;
