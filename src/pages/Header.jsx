import React, { useContext, useEffect, useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import { GlobalContext } from '../Context/Context';
import { Button } from 'flowbite-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Swal from 'sweetalert2';
import { getAuth, signOut } from 'firebase/auth';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useContext(GlobalContext);

  const logoutUser = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({ type: 'USER_LOGOUT' });
        Swal.fire('Logged Out', 'You have logged out successfully', 'success');
      })
      .catch((error) => {
        Swal.fire('Error', 'Error during logout', 'error');
        console.error('Error during logout:', error);
      });
  };

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from('#logo', {
      y: -20,
      delay: 0.3,
      opacity: 0,
      duration: 0.5,
    });
    tl.from('#nav ul li', {
      y: -10,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
    });
  }, []);

  return (
    <>
      <div className="bg-white h-[70px] w-full shadow-md fixed top-0 left-0 z-20">
        <div className="h-full w-full flex justify-between items-center px-6 md:px-12">
          <Link to="/" id="logo" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            🛍️ My Store.Co
          </Link>
          <nav id="nav" className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-lg text-gray-700">
              <li><Link to="/" className="no-underline hover:text-blue-600 transition">Home</Link></li>
              <li><Link to="/Product" className="no-underline hover:text-blue-600 transition">Products</Link></li>
              <li><Link to="/Categories" className="no-underline hover:text-blue-600 transition">Categories</Link></li>
              <li><Link to="/Aboutus" className="no-underline hover:text-blue-600 transition">About</Link></li>
              {state?.isLogin === true ? (
                <li>
                  <Button
                    onClick={logoutUser}
                    color="success"
                    className="py-1 px-4 bg-green-600 hover:bg-green-700 transition"
                  >
                    Logout
                  </Button>
                </li>
              ) : state?.isLogin === false ? (
                <li><Link to="/Login" className="no-underline hover:text-blue-600 transition">Login</Link></li>
              ) : null}
              <li><Link to="/Signup" className="no-underline text-blue-600 font-medium hover:underline">Sign Up</Link></li>
            </ul>
          </nav>
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoMdClose /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white w-full fixed top-[70px] left-0 shadow-lg z-10 transition-all duration-300 ease-in-out">
          <ul className="flex flex-col gap-4 py-4 text-lg text-gray-700 text-center">
            <li><Link to="/" className="no-underline hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/Product" className="no-underline hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Products</Link></li>
            <li><Link to="/Categories" className="no-underline hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Categories</Link></li>
            <li><Link to="/Aboutus" className="no-underline hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>About</Link></li>
            {state?.isLogin === true ? (
              <li>
                <Button
                  onClick={() => {
                    logoutUser();
                    setIsOpen(false);
                  }}
                  color="success"
                  className="mx-auto py-1 px-4 bg-green-600 hover:bg-green-700 transition"
                >
                  Logout
                </Button>
              </li>
            ) : state?.isLogin === false ? (
              <li><Link to="/Login" className="no-underline hover:text-blue-600 transition" onClick={() => setIsOpen(false)}>Login</Link></li>
            ) : null}
            <li><Link to="/Signup" className="no-underline text-blue-600 font-medium hover:underline" onClick={() => setIsOpen(false)}>Sign Up</Link></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;