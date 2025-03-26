import AuthLayout from "../page/AuthLayout";
import Homepage from "../page/Homepage";
import Login from "../page/Login";
import Register from "../page/Register";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Homepage/>} />
        {/* ---------LOGIN------------ */}
        <Route element={<AuthLayout />}>
          <Route path="/bookmarks" element={<div>My Bookmark</div>} />
          <Route
            path="/bookmarks:id"
            element={<div>My Bookmark delete/change path</div>}
          />
          <Route path="/detail-news" element={<div>Detail news</div>} />
          <Route path="/detail-summarize" element={<div>Summarize news</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
