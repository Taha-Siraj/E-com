import React, { useContext, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import Products from './Products';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  // const baseUrl = 'https://server-ecom-rho.vercel.app';
    const baseUrl = 'http://localhost:5004';
  

 

  return (
    <div className="font-poppins bg-white py-6 px-10">
     <div className='bg-[#FCF0E4] w-full px-6 sm:px-10 md:px-14 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6'>
  {/* Left Content */}
  <div className='flex flex-col justify-center items-center md:items-start  gap-3 max-w-md py-2'>
    <h1 className='text-xl sm:text-2xl md:text-3xl sm:text-center md:text-start font-semibold text-green-800 leading-tight'>
      Grab Upto 50% Off on Selected Headphones
    </h1>
    <button className='bg-green-900 py-2 px-4 rounded-md font-semibold hover:bg-green-950 text-white'>
      Buy Now
    </button>
  </div>

  {/* Image */}
  <img
    src="banner.webp"
    alt="Headphone Banner"
    className='w-full max-w-xs sm:max-w-sm md:max-w-md'
  />
</div>

      <main>
        <div className="bg-white">
          <div className="text-center py-24 md:py-32 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Discover Your Next Favorite
              <br />
              <span className="text-indigo-600">
                <Typewriter
                  words={['computer electronics', 'Outfit', 'Mobile Phone', 'Explore Products', "All Collection" ]}
                  loop={true}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
              Your one-stop shop for everything you need. Quality products, unbeatable prices.
            </p>
            <div className="mt-8">
              <Link
                to="/product"
                className="inline-block bg-indigo-600 text-white font-bold text-lg rounded-lg px-8 py-3 transition-transform transform hover:-translate-y-1"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>   
        <div id="products-section">
          <Products />
        </div>
      </main>
    </div>
  );
};

export default Home;