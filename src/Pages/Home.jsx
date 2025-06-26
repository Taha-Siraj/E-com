import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
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
      <Products/>
    </div>
  );
};

export default Home;
