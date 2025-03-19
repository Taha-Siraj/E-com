import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { GlobalContext } from '../Context/Context'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Signup = () => {
  const [isShow, setIsShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {state , dispatch} = useContext(GlobalContext)
  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    if(email === "" || password === "" || name === ""){
      toast.warn("Please fill in all fields!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      }) 
      return
    }
    if(password.length < 6){
      toast.error("Password should be at least 6 characters ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      })
      return
    }
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("users", user)
        navigate("/login")
        setName("")
        setEmail("")
        setPassword("")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error" , error)
        toast.error("This Email Already In Use", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
              transition: Bounce,
            });

      });
  };
  
  
  

  return (
    <>
     <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce} />
   
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
              className="py-2 px-3 border-0 outline-0 rounded-sm w-full text-black text-[18px]"
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
    </>
  );
};

export default Signup;
