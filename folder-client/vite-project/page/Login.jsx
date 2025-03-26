import { useState } from "react";
import { Link } from "react-router";
import http from "../helper/http";
export default function Login() {
  const [email, setTitle] = useState("");
  const [password, setPassword] = useState("");

  function changeEmail(event) {
    setTitle(event.target.value);
    console.log(event.target.value);
  }
  function changePassword(event) {
    setPassword(event.target.value);
    console.log(event.target.value);
  }

  async function submitLogin(body) {
    try {
        let response = await http.post('/login', body)
        console.log(response);
    } catch (error) {
        console.log(error);
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
          <button onClick={() => {submitLogin({email, password})}}
          type="button"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Gas masuk
          </button>
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
