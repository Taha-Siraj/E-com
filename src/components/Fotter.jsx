import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { IoCallSharp } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

const Fotter = () => {

  const contactInfo = [
    {
      icon: <IoLocationSharp className='text-2xl text-[#FF6B6B]' />,
      title: 'Visit Us',
      text: 'karachi, pakistan',
    },
    {
      icon: <IoCallSharp className='text-2xl text-[#FF6B6B]' />,
      title: 'Call Us',
      text: '+92 3123456789',
    },
    {
      icon: <IoTimeOutline className='text-2xl text-[#FF6B6B]' />,
      title: 'Working Hours',
      text: 'Mon - Fri: 9 AM - 5 PM',
    },
    {
      icon: <MdOutlineEmail className='text-2xl text-[#FF6B6B]' />,
      title: 'Email Us',
      text: 'e-shop@gmail.com'
    }        
  ]
  return (
    <div>
        <hr />
      <div>
      
      </div>
    </div>
  )
}

export default Fotter
