import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
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
