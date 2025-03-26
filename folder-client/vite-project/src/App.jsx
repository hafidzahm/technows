import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/bookmarks" element={<div>My Bookmark</div>} />
        <Route path="/bookmarks:id" element={<div>My Bookmark delete/change path</div>} />
        <Route path="/news" element={<div>All news</div>} />
        <Route path="/detail-news" element={<div>Detail news</div>} />
        <Route path="/detail-summarize" element={<div>Summarize news</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
