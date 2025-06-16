import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loader , setLoader] = useState(false);
  const baseUrl = "https://server-ecom-rho.vercel.app";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;
    
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    
    try {
      setLoader(true)
      const res = await axios.post(`${baseUrl}/signup`, {
        firstName,
        lastName,
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success(res.data.message || "Signup successful!");
      console.log("Signup Response:", res.data);
      setLoader(false)
    } catch (error) {
      console.error("Signup Error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
      setLoader(false)
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-xl font-semibold mb-4">Signup Form</h2>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 mb-4"
            required
          />
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
            "Signup"
          )}
        </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
