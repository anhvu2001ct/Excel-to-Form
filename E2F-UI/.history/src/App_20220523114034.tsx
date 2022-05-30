import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Navigate from "./components/navigate";

const App = () => {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Navigate />} />
        <Home />
        <Dashboard />
      </Routes>
    </div>
  );
};

export default App;
