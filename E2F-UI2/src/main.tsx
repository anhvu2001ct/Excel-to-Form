import ReactDOM from "react-dom/client";
import "antd/dist/antd.css";
import App from "./App";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <ToastContainer></ToastContainer>
  </>
);
