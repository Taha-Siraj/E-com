import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GlobalContext } from '../Context/Context';
import { toast, Toaster } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Login = () => {
  const { dispatch } = useContext(GlobalContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const baseUrl = 'https://server-ecom-rho.vercel.app';

  useGSAP(() => {
    gsap.from('#img', {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
    gsap.from('#login', {
      x: 200,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
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
        dispatch({ type: 'USER_LOGIN', payload: res.data });
        setTimeout(() => navigate('/'), 1500);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed. Try again.');
      } finally {
        setLoader(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 gap-x-10 px-4">
      <Toaster position="top-center" richColors />
      

      <div id="img" className="hidden md:flex justify-center items-center">
        <img
          src="https://www.ymple.com/images/template2020/user/signup.png"
          alt="Login Illustration"
          className="h-[450px] drop-shadow-xl"
        />
      </div>

      <form
        id="login"
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl p-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
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

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
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
            <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
          )}
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">
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
