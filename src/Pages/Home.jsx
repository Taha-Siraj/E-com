import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  
    return (
    <div>
      <h1>Home</h1>
      <Link to='/login' className='py-2 px-4 bg-slate-700 text-xl font-poppins rounded-md active:scale-90 text-white no-underline' >Login</Link>
      <Link to='/signup' className='py-2 px-4 bg-slate-900 text-xl font-poppins rounded-md active:scale-90 text-white no-underline' >Signup</Link>
    </div>
  )
}

export default Home
