import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
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
      <Navbar/>

      <Outlet />
    </>
  );
}
