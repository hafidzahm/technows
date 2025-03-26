import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
export default function AuthLayout() {
  const navigate = useNavigate()
  useState(() => {
    console.log('-----GUARD LOGIN------');
    guardLogin()
  }, [])

  function guardLogin() {
    let token = localStorage.getItem('access_token')
    if (!token) {
      navigate('/login')
    }
  }
  return (
    <>
      <div>
        <h1>Auth layout</h1>
      </div>

      <Outlet />
    </>
  );
}
