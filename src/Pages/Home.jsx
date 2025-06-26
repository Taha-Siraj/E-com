import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import './home.css'
import Products from './Products';
import { Typewriter } from 'react-simple-typewriter';
const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isOpen , setIsOpen] = useState(true);
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
          <div className='h-[70px] flex justify-between px-10 items-center font-poppins top-5 left-0 right-0 sticky z-10 mx-5 border-[0.2px]  border-[#99999973] rounded-2xl ' id='nav'>
      <div className='h-full py-1 flex justify-center items-center font-poppins'>
      <h1 className='text-2xl text-red-400'>E-Commerce</h1>
      </div>
      <div className='hidden  md:flex text-xl justify-center items-center gap-x-5'>
        <Link to='/home' className='no-underline text-gray-200 hover:text-gray-600 transition duration-75' >Home</Link>
        <Link to='/product' className='no-underline text-gray-200 hover:text-gray-600 transition duration-75 '>products</Link>
        <Link to='/category' className='no-underline text-gray-200 hover:text-gray-600 transition duration-75 '>category</Link>
      </div>
      <button>   </button>
    </div>
     {isOpen ? <div className='md:hidden fixed outline-none top-24 z-10 left-0 right-0 h-[400px] mx-5 rounded-2xl border-[0.5px] border-[#a3a3a360]  ' id='nav'>
      <div className=' flex flex-col h-full gap-y-5  text-2xl justify-center items-center gap-x-5'>
        <Link to='/home' className='no-underline text-gray-300 hover:text-gray-600 transition duration-75' >Home</Link>
        <Link to='/product' className='no-underline text-gray-300 hover:text-gray-600 transition duration-75 '>products</Link>
        <Link to='/category' className='no-underline text-gray-300 hover:text-gray-600 transition duration-75 '>category</Link>
      </div>
      </div> : null }
      <Products/>
    </div>
    </>
  );
};

export default Home;
