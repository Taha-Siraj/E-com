import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GlobalContext } from '../Context/Context';
import { toast, Toaster } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './login.css'

const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const baseUrl = 'https://server-ecom-rho.vercel.app';
  
  // const baseUrl = 'http://localhost:5004';
  
  useGSAP(() => {
    gsap.from('#login-form', {
     scale: 1.5,
     opacity: 0,
     duration: 1,
    });
  }, []);

  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoader(true);
        const res = await axios.post(`${baseUrl}/login`, values, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        
        toast.success('User logged in successfully');
        dispatch({ type: 'USER_LOGIN', payload: res.data.user});
        localStorage.setItem("user", JSON.stringify(res.data.user)); 
        setTimeout(() => navigate('/'), 1500);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed. Try again.');
      } finally {
        setLoader(false);
      }
    },
  });

  
  return (
    <div id='login-bg' className="font-poppins min-h-screen flex items-center justify-center gap-x-10 px-4">
      <Toaster position="top-center" richColors />
      <form
        id="login-form"
        onSubmit={formik.handleSubmit}
        className="w-full flex justify-center flex-col  max-w-sm gap-y-6 p-4"
      >
        <h2 className="text-3xl font-bold text-center text-[#fff]">Welcome Back</h2>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your email"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              formik.touched.email && formik.errors.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              formik.touched.password && formik.errors.password
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500">{formik.errors.password}</p>
          )}
        </div>

        <div className=" flex justify-center items-center  gap-x-2 text-xl
         text-gray-200">
          Don't have an account?{' '}
          <Link to="/signup" className="text-gray-300  hover:underline">
            Sign up
          </Link>
        </div>

        <button
          type="submit"
          disabled={loader}
          className="w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-2 rounded hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-60"
        >
          {loader ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
