import React, { useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom'

const Header = () => {

    const [isopen , setisopen] = useState (false)
  return (
    <>
    <div className='bg-[#192231] h-[70px] w-full '>
      <div className='h-full w-full flex justify-between items-center px-12'>
        <h1 className='text-3xl font-extrabold text-[#8E44AD]'>🛍️ My Store👜</h1>
        <nav className=' items-center gap-x-4'>
            <ul className='items-center gap-x-5 text-[22px] text-white hidden md:flex'>
                <li><Link to="/" className='no-underline text-[#c746ff] ' >Home</Link></li>
                <li><Link to="/Product"  className='no-underline text-[#c746ff] '>Product</Link></li>
                <li><Link to="/Categories"  className='no-underline text-[#c746ff] '>Categories</Link></li>
                <li><Link to="/Aboutus"  className='no-underline text-[#c746ff] '>About</Link></li>
                <li><Link to="/Signup"  className='no-underline text-[#c746ff] '>Signup</Link></li>
            </ul>
        </nav>
        {(isopen) ?
        <i className='text-3xl text-white block cursor-pointer md:hidden' onClick={() => setisopen(!isopen)}  ><IoMdClose/></i>   
    : 
    <i className='text-3xl text-white block cursor-pointer  md:hidden' onClick={() => setisopen(!isopen)} ><FiMenu/></i>
    }
      </div>
    </div>
     {(isopen)?
    <div className='md:hidden -translate-y-[full] transition-all duration-3000 bg-gray-900 text-white py-4 w-full absolute top-[60px] left-0 shadow-xl z-10'>
    <ul className='flex  flex-col gap-y-4 items-center gap-x-5 text-[22px] text-white md:hidden'>
    <li><a href="">Home</a></li>
    <li><a href="">Categories</a></li>
    <li><a href="">Product</a></li>
    <li><a href="">Signup</a></li>
    <li><a href="">Login</a></li>
    </ul>
    </div>
    :null 
    }
    
    </>
  )
}

export default Header
