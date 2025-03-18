import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
  const [isShow , setIsShow] = useState(false)
  return (
    <div className='bg-slate-500 h-screen W-[100%] flex justify-center items-center'>
     <div className="min-h-[400px] w-[400px] bg-gray-900 py-2 rounded-lg px-8 overflow-hidden">
             <form className="flex flex-col justify-center items-center h-full gap-6 font-mono relative">
               <h1 className="text-white text-3xl font-serif">Login Form</h1>
     
     
               {/* Email Input */}
               <label htmlFor="email" className="text-2xl text-white w-full">
                 Email:
               </label>
               <input
                 type="email"
                 placeholder="Email"
                 id="email"
                 className="py-2 px-5 border-0 outline-0 rounded-sm w-full text-black text-[18px]"
               />
     
               {/* Password Input with Toggle */}
               <label htmlFor="password" className="text-2xl text-white w-full">
                 Password:
               </label>
               <div className="relative w-full">
                 <input
                   type={isShow ? "text" : "password"}
                   placeholder="Password"
                   id="password"
                   className="py-2 px-5 border-0 outline-0 rounded-sm w-full text-black text-[18px]"
                 />
                 <span
                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer z-50 pointer-events-auto text-gray-700"
                   onClick={() => setIsShow((prev) => !prev)}
                 >
                   {isShow ? <BiHide /> : <BiShow />}
                 </span>
               </div>
     
               {/* Signup/Login Text */}
               <p className="text-xl text-white">
                 Already have an account? 
                 <Link className="underline  text-slate-500 underline-offset-4" to="/Signup">
                   Signup
                 </Link>
               </p>
     
               {/* Submit Button */}
               <button type="submit" className="bg-slate-300 py-2 px-5 text-xl rounded-sm">
                 Login
               </button>
             </form>
           </div>
    </div>
  )
}

export default Login
