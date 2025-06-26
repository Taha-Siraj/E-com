import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import './home.css'
import Products from './Products';

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

  return (
    <>
 
    <div id='home' className="font-poppins">
          <div className='h-[70px] flex justify-between px-10 items-center font-poppins top-0 left-0 right-0 sticky z-10' id='nav'>
      <div className='h-full py-1'>
          <img src="/logo.png" className='h-full'  alt="" />
      </div>
      <div className=' flex text-xl justify-center items-center gap-x-5'>
        <Link to='/home' className='no-underline text-gray-200 hover:text-gray-600 transition duration-75' >Home</Link>
        <Link to='/product' className='no-underline text-gray-200 hover:text-gray-600 transition duration-75 '>products</Link>
      </div>
    </div>
      <Products/>
    </div>
    </>
  );
};

export default Home;
