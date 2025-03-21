import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { getAuth, signInWithEmailAndPassword ,  signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { GlobalContext } from '../Context/Context';

const Login = () => {
  const [isShow , setIsShow] = useState(false)
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const navigate =  useNavigate()
  const {state  , dispatch} = useContext(GlobalContext)
 
  useEffect(() => {
    console.log("state",state) 
  } , [state])

  const signinUser = (e) => {
    e.preventDefault()
    const auth = getAuth();
    if(email === "" || password === ""){
      toast.warn("Please fill in all fields!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
      return
    }
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    dispatch({type: 'USER_LOGIN', payload: user})
    navigate("/")
    console.log("user", user)
    setEmail("")
    setPassword("")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error("No account found. Please sign up to proceed.", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
    setEmail("")
    setPassword("")
  });
}

  const signinGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
 signInWithPopup(auth, provider)
   .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log("users Google",user)
    dispatch({ type: 'USER_LOGIN', payload: user });
    navigate("/")
    toast.success('SuceesFully Login With Google', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });

  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);

  });

  }
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
        transition={Bounce}
      />
    <div className='bg-slate-500 h-screen W-[100%] flex justify-center items-center'>
     <div className="min-h-[400px] w-[400px] bg-gray-900 py-2 rounded-lg px-8 overflow-hidden">
             <form className="flex flex-col justify-center items-center h-full gap-3 font-mono relative" onSubmit={signinUser}>
               <h1 className="text-white text-3xl font-serif">Login Form</h1>
               <label htmlFor="email" className="text-2xl text-white w-full">
                 Email:
               </label>
               <input
                 type="email"
                 placeholder="Email"
                 id="email"
                 value={email}
                 onChange={(e) =>setEmail(e.target.value)}
                 className="py-2 px-3 border-0 outline-0 rounded-sm w-full text-black text-[18px]"
                 />
               <label htmlFor="password" className="text-2xl text-white w-full">
                 Password:
               </label>
               <div className="relative w-full">
                 <input
                   type={isShow ? "text" : "password"}
                   placeholder="Password"
                   id="password"
                   value={password}
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
               <p className="text-xl text-white">
                 Already have an account? 
                 <Link className="underline  text-slate-500 underline-offset-4" to="/Signup">
                   Signup
                 </Link>
               </p>
               <button type="submit" className="bg-slate-300 py-2 px-5 text-xl rounded-sm">
                 Login
               </button>
               <div className="flex items-center w-full">
                 <hr className="flex-grow border-t border-gray-300" />
                 <span className="px-2 text-white font-sans capitalize">OR Cteated with</span>
                 <hr className="flex-grow border-t border-gray-300" />
               </div>
               <span className=' flex justify-center items-center gap-x-3 rounded-md font-semibold font-mono text-[18px] cursor-pointe py-1 px-4 capitalize' onClick={signinGoogle} ><FcGoogle className='text-4xl cursor-pointer'/></span>
             </form>
           </div>
    </div>
    </>
  )
}

export default Login
