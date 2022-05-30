import { Outlet } from "react-router-dom";
import Navigate from "./components/navigate";
import Notification from "./components/notification/Notification";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Navigate />
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Notification></Notification>
    </>
  );
};

export default App;
