import { useState } from "react";
import { Link, useNavigate } from "react-router";
import http from "../helper/http";
import Swal from "sweetalert2";
export default function Register() {
  const [email, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function changeEmail(event) {
    setTitle(event.target.value);
    console.log(event.target.value);
  }
  function changePassword(event) {
    setPassword(event.target.value);
    console.log(event.target.value);
  }
  function changeName(event) {
    setName(event.target.value);
    console.log(event.target.value);
  }

  async function submitLogin(body) {
    try {
      console.log(body, 'creatingggg....');
        let response = await http.post('/users', body)
        console.log(response);
        Swal.fire({
          title: "Success!",
          text: `Akun dengan email ${response.data.email} berhasil dibuat!`,
          icon: "success"
        });
        navigate('/login')
    } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message,
          icon: "error"
        });
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Bikin akun dulu kuy!
        </h2>
        <form className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Lorem Ipsum Doe"
              value={name}
              onChange={changeName}
            />
          </div>
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
          <button onClick={() => {submitLogin({name, email, password})}}
          type="button"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Gas bikin akun
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          <span>Udah punya akun? </span>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            ke halaman login kuy!
          </Link>
        </div>
      </div>
    </div>
  );
}
