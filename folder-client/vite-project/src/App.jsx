import AuthLayout from "../page/AuthLayout";
import Bookmarks from "../page/Bookmarks";
import Details from "../page/Details";
import Homepage from "../page/Homepage";
import Login from "../page/Login";
import PublicLayout from "../page/PublicLayout";
import Register from "../page/Register";
import Summarize from "../page/Summarize";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider as ReduxProvider } from 'react-redux'
import store from "../store";
function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PublicLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/details" element={<Details />} />
          </Route>
          {/* ---------LOGIN------------ */}
          <Route element={<AuthLayout />}>
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route
              path="/bookmarks:id"
              element={<div>My Bookmark delete/change path</div>}
            />
            <Route path="/summarize" element={<Summarize />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
