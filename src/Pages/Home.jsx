import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
   const baseUrl = 'https://server-ecom-rho.vercel.app';
  // const baseUrl = 'http://localhost:5004';
  const handleLogout = async() => {
    try {
      let res = await axios.post(`${baseUrl}/logout`,{},
         {withCredentials: true}
        )
      dispatch({ type: 'USER_LOGOUT' });
      console.log(res)
      toast.success('Logged out successfully!');
      localStorage.removeItem("user")
      navigate('/login');
    } catch (error) {
       console.error("Logout Error:", error);
    toast.error("Failed to logout. Try again.");      
    }
  };




  return (
    <div id='home' className="min-h-screen bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome, {`${state.user.user.first_name} ${state.user.user.last_name}`}! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          You have successfully logged in to the E-Commerce App.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
