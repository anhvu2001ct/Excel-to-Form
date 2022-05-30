import { Outlet } from "react-router-dom";
import Navigate from "./components/navigate";
import { Notifications } from "./components/notification/Notifications";

const App = () => {
  return (
    <>
      <Notifications />
      <div className="wrapper">
        <Navigate />
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
