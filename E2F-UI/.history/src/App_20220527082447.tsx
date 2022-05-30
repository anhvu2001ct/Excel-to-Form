import { Outlet } from "react-router-dom";
import Navigate from "./components/navigate";
import Notification from "./components/notification/Notifications";

const App = () => {
  return (
    <>
      <div className="wrapper">
        <Navigate />
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Notification />
    </>
  );
};

export default App;
