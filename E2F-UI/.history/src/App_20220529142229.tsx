import { Outlet } from "react-router-dom";
import Navigate from "./components/navigate";
import { Notifications } from "./components/notification/Notifications";
import WorkbookDetail from "./components/workbook-detail/WorkbookDetail";

const App = () => {
  return (
    <>
      <Notifications />
      <div className="wrapper">
        <Navigate />
        <div className="container">
          <Outlet />
          <WorkbookDetail></WorkbookDetail>
        </div>
      </div>
    </>
  );
};

export default App;
