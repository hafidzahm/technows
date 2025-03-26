import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "../components/Footer";
export default function AuthLayout() {
  const navigate = useNavigate()
  useEffect(() => {
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
      <Footer/>
    </>
  );
}
