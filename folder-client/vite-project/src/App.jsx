import AuthLayout from "../page/AuthLayout";
import Login from "../page/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/" element={<div>All news</div>} />
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
