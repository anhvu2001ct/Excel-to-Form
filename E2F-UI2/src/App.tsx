import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutMain from "./components/layout/LayoutMain";
import HomePage from "./pages/HomePage";
import { WorkbookDetailPage } from "./pages/WorkbookDetailPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutMain />}>
            <Route index element={<HomePage />}></Route>
            <Route
              path="/workbook/:id"
              element={<WorkbookDetailPage />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
