import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

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
      <div className='px-5'>
        <hr />
        <div>
          <h1 className='text-2xl font-extrabold text-green-600' ><span className='text-black'>E</span>-SHOP</h1>
          <p className='text-[16px]' >Discover curated furniture collections at Shopcart, blending style and comfort to elevate your living spaces.</p>
        </div>
      </div>


    </div>
  )
}

export default Fotter
