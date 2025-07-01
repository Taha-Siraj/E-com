import React, { useContext, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import Products from './Products';
import { Typewriter } from 'react-simple-typewriter';
import Navbar from '../components/Navbar';

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  // const baseUrl = 'https://server-ecom-rho.vercel.app';
    const baseUrl = 'http://localhost:5004';
  return (
    <div className="font-poppins bg-white pt-20">
    <div className='px-10'>
    <div className='bg-[#FCF0E4] w-full px-6 sm:px-10 md:px-14 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6'>
    <div className='flex flex-col justify-center items-center md:items-start  gap-3 max-w-md py-2'>
    <h1 className='text-xl sm:text-2xl md:text-3xl sm:text-center md:text-start font-semibold text-green-800 leading-tight'>
    Grab Upto 50% Off on Selected Headphones
    </h1>
    <button className='bg-green-900 py-2 px-4 rounded-md font-semibold hover:bg-green-950 text-white'>
    Buy Now
    </button>
  </div>
  <img
    src="banner.webp"
    alt="Headphone Banner"
    className='w-full max-w-xs sm:max-w-sm md:max-w-md'/>
  </div>
  </div>
  <main>
  <div id="products-section">
    <Products />
  </div>
  </main>
  </div>
  );
};

export default Home;