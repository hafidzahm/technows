import { Outlet } from "react-router";
import Navbar from "./Navbar";
export default function PublicLayout() {
  return (
    <>
      <Navbar/>

      <Outlet />
    </>
  );
}
