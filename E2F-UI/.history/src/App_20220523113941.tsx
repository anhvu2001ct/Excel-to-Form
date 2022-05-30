import { Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Navigate from "./components/navigate";

const App = () => {
  return (
    <div className="wrapper">
      <Navigate />

      <Routes></Routes>
      <Navigate />
      <Home />
      <Dashboard />
    </div>
  );
};

export default App;
