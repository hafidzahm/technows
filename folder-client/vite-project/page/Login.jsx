import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import http from "../helper/http";
import Swal from "sweetalert2";
export default function Login() {
  useEffect(() => {
    guardLogin();
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_API,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt()
  }, []);
  const navigate = useNavigate();

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      let {data} = await http({
        method: 'post',
        url: '/google-login',
        data: {
          googleToken: response.credential
        }
      })
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      navigate("/bookmarks");
    } catch (error) {
      console.log(error);
    }
  }

  const [email, setTitle] = useState("");
  const [password, setPassword] = useState("");


  function guardLogin() {
    let token = localStorage.getItem("access_token");
    if (token) {
      navigate("/bookmarks");
    }
  }
  function changeEmail(event) {
    setTitle(event.target.value);
    console.log(event.target.value);
  }
  function changePassword(event) {
    setPassword(event.target.value);
    console.log(event.target.value);
  }

  function withoutLogin() {
    navigate("/");
  }

  async function submitLogin(body) {
    try {
      let response = await http.post("/login", body);
      console.log(response);
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/bookmarks");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login dulu kuy!
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
              value={email}
              onChange={changeEmail}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={changePassword}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => {
                submitLogin({ email, password });
              }}
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Gas masuk
            </button>
            <button
              onClick={withoutLogin}
              type="button"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            >
              Liat-liat dulu aja
            </button>
            <h1 className="text-sm">atau</h1>
            <button
              type="button"
              id='google-btn'
            >
              Login with Google
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          <span>Belum punya akun? </span>
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            register dulu gas !
          </Link>
        </div>
      </div>
    </div>
  );
}
