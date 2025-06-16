// src/Login.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const baseUrl = "https://server-ecom-rho.vercel.app"
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res = await axios.post(`${baseUrl}/login`,{
      email: formData.email,
      password: formData.password
    },{ 
      headers:{ "Content-Type": 'application/json' },
      withCredentials: true
    })
    console.log(res)
  } catch (error) {
   console.log(error.response?.data?.message);
  }
};

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
