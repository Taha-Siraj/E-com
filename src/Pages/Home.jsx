import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import Products from './Products';
import { Typewriter } from 'react-simple-typewriter';
import Navbar from '../components/Navbar';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { FaLuggageCart } from 'react-icons/fa';

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [ allProducts, setAllProducts ] = useState([]);
  const [HomeProducts ,  setHomeProducts] = useState([])
  const navigate = useNavigate();
  // const baseUrl = 'https://server-ecom-rho.vercel.app';
    const baseUrl = 'http://localhost:5004';

    const fetchProducts = async() => {
      try {
        let res = await axios.get(`${baseUrl}/allproducts`);
        console.log("res.data", res.data.splice(0,6));
        setHomeProducts(res.data.splice(0, 10));
        setAllProducts(res.data.splice(0,6));
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
      fetchProducts()
    }, [])

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
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-3 p-4'>
   {HomeProducts.map((eachProduct) => (
    <div key={eachProduct._id} className='bg-white w-[250px] rounded-md flex flex-col overflow-hidden border-[0.5px] border-[#e2e5f795]'>
      <div className='relative overflow-hidden'>
        <img src={eachProduct.product_img} alt={eachProduct.product_name} className='w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-300' />
        {eachProduct?.category_name && ( 
       <div className='absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1rounded-full shadow-md'> 
           {eachProduct.category_name}
          </div>
           )}
        <div className='px-3 text-start justify-center items-start capitalize py-4 gap-y-3 flex flex-col'>
          <h2 className='text-lg font-semibold text-gray-800'>{eachProduct.product_name}</h2>
          <p className='text-gray-600'>Price: ${eachProduct.product_price}</p>
          <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, index) => (
              index < eachProduct.rating ? 
              <MdOutlineStarPurple500 key={index} className='text-yellow-500' /> : 
              <MdOutlineStarPurple500 key={index} className='text-gray-300' />
            ))}
          </div>
        <button 
        onClick={() => navigate(`/product/${eachProduct._id}`)}
        className='bg-[#063c28cc] mt-2 flex justify-center gap-x-2 items-center rounded-full py-2 px-4 font-semibold hover:scale-100 transition-all  text-[#f0f0f0]'><FaLuggageCart/>
        Add To cart
      </button>
        </div>
        
      </div>
      
    </div>
    ))}
  </div>
  </main>



  <div className='px-10'>
    <div className='py-5 items-start px-10 border border-gray-300 rounded-md w-full'>
    <h1 className='text-2xl'>Popular Categories</h1>
     <hr className='h-1'/>
     <div className='flex justify-center gap-5 items-center flex-wrap '>
      {allProducts.map((eachProduct) => (
        <div key={eachProduct?.category_id} className='h-[120px] flex justify-start gap-x-7 px-4 items-center w-[350px] bg-[#F6F6F6]' >
        <img src={eachProduct?.product_img} width={80} alt="" className='p-2 hover:scale-105 cursor-pointer border rounded-md border-yellow-700'  />
        <h1 className='text-[17px] flex flex-col gap-y-2 justify-center items-start font-semibold'>{eachProduct?.category_name}<span className='text-sm font-normal'>1 items Available</span> </h1>
      </div>
      ))}
      
    </div>
    </div>
    
    <div>
    </div>
  </div>
  </div>
  );
};

export default Home;