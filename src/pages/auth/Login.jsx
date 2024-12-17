import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import { loginUsuario } from "../../services/auth";

export default function Login() {
  const [currentName, setCurrentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUsuario(email, password);
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <div className="mt-0 mb-16">
        <h1 className="text-6xl mb-8 text-center font-bold font-montserrat text-white">
          Acceder
        </h1>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg p-6 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 dark:shadow-sm-light"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-lg p-6 rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-violet-500 dark:focus:border-violet-500 dark:shadow-sm-light"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-lg px-5 p-3 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
