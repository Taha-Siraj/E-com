import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { GlobalContext } from '../Context/Context';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isShow, setIsShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  const showToast = (type, message) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  const signinUser = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    if (!email || !password) {
      showToast("warn", "Please fill in all fields!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch({ type: 'USER_LOGIN', payload: user });
      navigate("/");
      showToast("success", "Successfully Logged In!");
      setEmail("");
      setPassword("");
    } catch (error) {
      showToast("error", "No account found. Please sign up to proceed.");
      setEmail("");
      setPassword("");
    }
  };

  const signinGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({ type: 'USER_LOGIN', payload: user });
      navigate("/");
      showToast("success", "Successfully Logged In with Google");
    } catch (error) {
      showToast("error", "Google login failed!");
    }
  };

  useGSAP(() => {
    gsap.from('#login-form', {
      y: 20,
      opacity: 0,
      delay: 0.3,
      duration: 0.5,
    });
  }, []);

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
        theme="light"
        transition={Bounce}
      />
      <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center p-4">
        <div id="login-form" className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <form className="flex flex-col gap-4 font-sans" onSubmit={signinUser}>
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
              Log In to Your Account
            </h1>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={isShow ? "text" : "password"}
                  placeholder="Enter your password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setIsShow(prev => !prev)}
                >
                  {isShow ? <BiHide size={20} /> : <BiShow size={20} />}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Don’t have an account?{" "}
              <Link to="/Signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
            >
              Log In
            </button>
            <div className="flex items-center w-full gap-2">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-sm text-gray-500">Or log in with</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <button
              type="button"
              onClick={signinGoogle}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition text-gray-700 font-medium"
            >
              <FcGoogle size={24} />
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;