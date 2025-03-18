import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import axios from "axios";
import { GlobalContext } from '../Context/Context'
const Signup = () => {
  const [isShow, setIsShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {state , dispatch} = useContext(GlobalContext)

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://api.escuelajs.co/api/v1/users/", {
        name,
        email,
        password,
        avatar: "https://api.lorem.space/image/face?w=150&h=150", 
      });
      
      console.log("User Registered:", res.data);
      setName("");
      setEmail("");
      setPassword("");
      
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  
  
  

  return (
    <div className="bg-slate-500 h-screen w-full flex justify-center items-center">
      <div className="min-h-[400px] w-[400px] bg-gray-900 py-4 rounded-lg px-8 overflow-hidden">
        <form className="flex flex-col justify-center items-center h-full gap-2 font-mono relative" onSubmit={registerUser}>
          <h1 className="text-white text-3xl font-serif font-extrabold">Signup Form</h1>
          <label htmlFor="name" className="text-2xl text-white w-full">
            Name:
          </label>
          <input
          value={name}
          type="text"
          placeholder="Name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          className="py-2 px-3 border-0 outline-0 rounded-sm w-full text-black text-[18px]"
          />
          <label htmlFor="email" className="text-2xl text-white w-full">
            Email:
          </label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 px-3 border-0 outline-0 rounded-sm w-full text-black text-[18px]"
            />
          <label htmlFor="password" className="text-2xl text-white w-full">
            Password:
          </label>
          <div className="relative w-full">
            <input
              type={isShow ? "text" : "password"}
              value={password}
              placeholder="Password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px- border-0 outline-0 rounded-sm w-full text-black text-[18px]"
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
            Already have an account?{" "}
            <Link className="underline text-gray-300" to="/login">
              Login
            </Link>
          </p>

          {/* Submit Button */}
          <button type="submit" className="bg-slate-300 py-2 px-5 text-xl rounded-sm">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
