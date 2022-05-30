import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Navigate from "./components/navigate";

const App = () => {
  return (
    <div className="wrapper">
      <Navigate />

      <Routes>
        <Route
        <Home />
        <Dashboard />
      </Routes>
    </div>
  );
};

export default App;
