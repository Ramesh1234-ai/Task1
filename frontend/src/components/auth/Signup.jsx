import { useState } from "react";
import { API } from "../api";
import { Navigate, useNavigate } from "react-router-dom";
export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate =useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await AuthAPI.login({
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      alert("Login success");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
    }
  };
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-xl">
        <h2 className="text-xl mb-4">Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="block mb-3 p-2 border"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="block mb-3 p-2 border"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="block mb-3 p-2 border"
        />
        <button className="bg-black text-white px-4 py-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );