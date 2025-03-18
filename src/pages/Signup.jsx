import React from 'react'
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
  <div className='bg-slate-500 h-screen W-[100%] flex justify-center items-center'>
        <div className='h-[400px] w-[400px] bg-gray-900 rounded-lg px-8'>
          <form className='flex flex-col justify-center items-center h-full gap-6 font-mono'>
            <h1 className='text-white text-3xl font-serif'>Login Form</h1>
            <label htmlFor="Email" className='text-2xl text-white'>
            Email: <input type="text" placeholder='Email' id='Email' className='py-2 px-5 border-0 outline-0 rounded-sm w-full text-black text-[18px]' />
            </label>
            <label htmlFor="password" className='text-2xl text-white'>
            password: <input type="password" placeholder='password' id='password' className='py-2 px-5 border-0 outline-0 rounded-sm w-full text-black text-[18px]' />
            </label>
            <p className='text-xl text-white'> don`t have an account <Link className='underline text-gray-300'to="/Signup" >Signup</Link> </p>
            <button type='submit' className='bg-slate-300 py-2 px-5 text-xl rounded-sm'> Login</button>
          </form>
        </div>
      </div>
  )
}

export default Signup
