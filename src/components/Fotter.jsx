import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from 'react-router-dom';

const Fotter = () => {

  const contactInfo = [
    {
      icon: <IoLocationSharp className='text-2xl text-[#171717]' />,
      title: 'Visit Us',
      text: 'karachi, pakistan',
    },
    {
      icon: <IoCallSharp className='text-2xl text-[#171717]' />,
      title: 'Call Us',
      text: '+92 3123456789',
    },
    {
      icon: <IoTimeOutline className='text-2xl text-[#171717]' />,
      title: 'Working Hours',
      text: 'Mon - Fri: 9 AM - 5 PM',
    },
    {
      icon: <MdOutlineEmail className='text-2xl text-[#171717]' />,
      title: 'Email Us',
      text: 'EShop@gmail.com'
    }        
  ]
  return (
    <div>
        <hr />
      <div className='flex justify-between items-start px-10'>
      {contactInfo.map((info, index) => (
        <>
        <div key={index} className='flex items-center gap-3 px-5 hover:bg-gray-100 cursor-pointer transition-all duration-300'>
          {info.icon}
          <div>
            <h3 className='text-lg font-semibold'>{info.title}</h3>
            <p className='text-gray-600'>{info.text}</p>
          </div>
        </div>
        </>
      ))}
      </div>
        <hr />
     <div className="w-full px-5 py-10">
  <div className="w-full flex flex-col md:flex-row justify-between items-start gap-10">
    <div className="max-w-sm w-full">
      <h1 className="text-2xl font-extrabold text-green-600">
        <span className="text-black">E</span>-SHOP
      </h1>
      <p className="text-[16px] text-gray-600 mt-2 capitalize">
        Discover curated OutFits collections at E-shop, blending style and comfort to elevate your living spaces.
      </p>
    </div>

    <div className="flex flex-col gap-y-2 items-start max-w-sm w-full">
      <h1 className="text-xl font-semibold">Quick Links</h1>
      <Link className="text-[15px] text-gray-600 hover:text-gray-800" to="/">Home</Link>
      <Link className="text-[15px] text-gray-600 hover:text-gray-800" to="/product">Shop</Link>
      <Link className="text-[15px] text-gray-600 hover:text-gray-800" to="/blog">Blog</Link>
      <Link className="text-[15px] text-gray-600 hover:text-gray-800" to="/hotdeal">Hot Deal</Link>
    </div>

    <div className="flex flex-col gap-y-2 items-start capitalize max-w-sm w-full">
      <h1 className="text-xl font-semibold">Categories</h1>
      <Link className="text-[15px] text-gray-600 hover:text-gray-800" to="/">Computer Accessories</Link>
      <Link className="text-[15px] text-gray-600 hover:text-gray-800" to="/">Shoes Collection</Link>
      <Link className="text-[15px] text-gray-600 hover:text-gray-800" to="/">Men Collection</Link>
      <Link className="text-[15px] text-gray-600 hover:text-gray-800" to="/">Men Watches</Link>
      <Link className="text-[15px] text-gray-600 hover:text-gray-800" to="/">Women Collection</Link>
    </div>

    <div className="flex flex-col gap-y-3 items-start max-w-sm w-full">
      <h1 className="text-xl font-semibold">Newsletter</h1>
      <p className="text-[16px] text-gray-600">
        Subscribe to our newsletter to receive updates and exclusive offers.
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        className="py-2 rounded-lg px-3 w-full border outline-none placeholder:capitalize"
      />
      <button className="bg-black w-full text-white py-2 px-4 rounded-lg">
        Subscribe
      </button>
    </div>
  </div>
</div>


<hr />

<p className='text-sm text-center text-black'>© 2025 E-SHOP. All rights reserved.</p>

    </div>
  )
}

export default Fotter
