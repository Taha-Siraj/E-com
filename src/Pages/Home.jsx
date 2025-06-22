import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './home.css'


const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
   const baseUrl = 'https://server-ecom-rho.vercel.app';
  // const baseUrl = 'http://localhost:5004';
  const handleLogout = async () => {
    try {
      let res = await axios.post(`${baseUrl}/logout`, {},
        { withCredentials: true }
      )
      dispatch({ type: 'USER_LOGOUT' });
      console.log("res", res)
      localStorage.removeItem("user")
      setTimeout(() => navigate('/'), 1500);
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Failed to logout. Try again.");
    }
  };

  // useGSAP(() => {
  //   gsap.from("#home-user", {
  //     scale: 1.5,
  //     y: -200,
  //     rotate: 300,
  //     opacity: 0,
  //     duration: 1,
  //   })
  // })

  return (
    <div id='home' className="font-poppins min-h-screen flex items-center justify-center px-4">
      <div id='home-user' className="rounded-xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-100 mb-4">
          Welcome, {`${state.user.user.first_name} ${state.user.user.last_name}`}! 🎉
        </h1>
        <p className="text-gray-200 mb-8">
          You have successfully logged in to the E-Commerce App.
        </p>

        <div className="flex justify-center gap-4 items-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
           <button className='py-2 px-3 rounded shadow-2xl bg-green-500   hover:scale-95 hover:bg-green-600 capitalize no-underline'>
            <Link className='no-underline  text-[#fff]' to='/addproduct'> Add Product</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
