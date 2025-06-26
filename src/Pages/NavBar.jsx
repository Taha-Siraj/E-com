import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='h-[70px] flex bg-gray-400  justify-between px-10 items-center font-poppins top-0 left-0 right-0 sticky z-10' id='nav'>
      <div className='h-full py-1'>
          <img src="/logo.png" className='h-full'  alt="" />
      </div>
      <div className=' flex text-xl justify-center items-center gap-x-5'>
        <Link to='/home' className='no-underline text-gray-200 hover:text-blue-400 transition duration-75' >Home</Link>
        <Link to='/product' className='no-underline text-gray-200 hover:text-blue-400 transition duration-75 '>products</Link>
      </div>
    </div>
  )
}

export default NavBar
