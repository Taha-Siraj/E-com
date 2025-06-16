import axios from 'axios';
import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loader , setLoader] = useState(false);
  const baseUrl = "https://server-ecom-rho.vercel.app"
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const {email , password} = formData
  if(!email || !password){
    toast.warning("All fields are required");
    return
  }
  try {
    setLoader(true)
    let res = await axios.post(`${baseUrl}/login`,{
      email: formData.email,
      password: formData.password
    },{ 
      headers:{ "Content-Type": 'application/json' },
      withCredentials: true
    })
    toast.success("Succesfully User Login")
    setLoader(false)
    console.log("res", res)
  } catch (error) {
    toast.error(error.response?.data?.message)
    console.log(error)
  }
};

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
       <Toaster position="top-center" richColors />
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
          disabled={loader}
          className={`w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${
            loader ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loader ? (
            <div className="h-5 w-5 border-[3px] border-white border-t-blue-500 rounded-full animate-spin-slow"></div>

          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
