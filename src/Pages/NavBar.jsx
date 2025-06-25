import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='h-[70px] flex bg-gray-400  justify-between px-10 items-center font-poppins '>
      <div className='h-full'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbGuyQPzHCKA9onH1riWW_M4GfN7NSK2HN2ofE1qCAHK4yYxtO_m4XzS7uPejI-owzpU" className='h-full'  alt="" />
      </div>
      <div className=' flex text-xl justify-center items-center gap-x-5'>
        <Link to='/home' className='no-underline text-gray-200 hover:text-blue-400 transition duration-75' >Home</Link>
        <Link to='/product' className='no-underline text-gray-200 hover:text-blue-400 transition duration-75 '>products</Link>
      </div>
    </div>
  )
}

export default NavBar
