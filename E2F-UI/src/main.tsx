import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import WorkbookDetail from "./components/workbook-detail/WorkbookDetail";
import WIPComponent from "./components/WIPComponent";
import NotFound from "./components/NotFound";
import About from "./components/About";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="workbook/:id" element={<WorkbookDetail />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="About" element={<About />} />
        <Route path="Feedback" element={<WIPComponent />} />
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
