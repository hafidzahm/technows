import { Outlet } from "react-router";
export default function AuthLayout() {
  return (
    <>
      <div>
        <h1>Auth layout</h1>
      </div>

      <Outlet />
    </>
  );
}
