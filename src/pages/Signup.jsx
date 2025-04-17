import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { GlobalContext } from '../Context/Context';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Signup = () => {
  const [isShow, setIsShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updated state:", state);
  }, [state]);

  const registerUser = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (!email || !password || !name) {
      toast.warn("Please fill in all fields!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("users", user);
        dispatch({ type: 'USER_LOGIN', payload: user });
        updateProfile(auth.currentUser, {
          displayName: name,
        });
        navigate("/");
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("This Email Already In Use", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
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
        theme="light"
        transition={Bounce}
      />
      <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <form className="flex flex-col gap-4 font-sans" onSubmit={registerUser}>
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
              Create Your Account
            </h1>
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                value={name}
                type="text"
                placeholder="Enter your name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                id="email"
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
                  value={password}
                  placeholder="Enter your password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setIsShow((prev) => !prev)}
                >
                  {isShow ? <BiHide size={20} /> : <BiShow size={20} />}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link className="text-blue-600 hover:underline" to="/login">
                Log in
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;