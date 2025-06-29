import React, { useContext, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import Products from './Products';
import { Typewriter } from 'react-simple-typewriter';
const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const baseUrl = 'https://server-ecom-rho.vercel.app';
  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/logout`, {}, { withCredentials: true });
      dispatch({ type: 'USER_LOGOUT' });
      localStorage.removeItem("user");
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Failed to logout. Try again.");
    }
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/product' },
    ...(state.user.user_role === 1 ?[
      { title: 'Add product', path: '/addproduct' },
      { title: 'Add Categories', path: '/AddCategories' },
    ]: [])
  ];

  return (
    <div className="font-poppins bg-white">
      <header className="sticky top-0 z-50">
        <nav className="bg-white/80 backdrop-blur-lg shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex-shrink-0">
                <Link to="/" className="text-3xl font-bold text-indigo-600">
                  E-Shop
                </Link>
              </div>

              <div className="hidden md:flex items-baseline space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
              
              <div className="hidden md:block">
                 {state.user ? (
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all">
                        Logout
                    </button>
                 ) : (
                    <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all">
                        Login
                    </Link>
                 )}
              </div>


              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? "open" : "close"}
                </button>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-700 hover:bg-indigo-500 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
                 <div className="pt-4 pb-2">
                    {state.user ? (
                        <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all">
                            Logout
                        </button>
                     ) : (
                        <Link to="/login" onClick={() => setMenuOpen(false)} className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all">
                            Login
                        </Link>
                     )}
                 </div>
              </div>
            </div>
          )}
        </nav>
      </header>
      
      <main>
        <div className="bg-white">
          <div className="text-center py-24 md:py-32 px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Discover Your Next Favorite
              <br />
              <span className="text-indigo-600">
                <Typewriter
                  words={['computer electronics', 'Outfit', 'Mobile Phone', 'Explore Products', "All Collection" ]}
                  loop={true}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
              Your one-stop shop for everything you need. Quality products, unbeatable prices.
            </p>
            <div className="mt-8">
              <Link
                to="/product"
                className="inline-block bg-indigo-600 text-white font-bold text-lg rounded-lg px-8 py-3 transition-transform transform hover:-translate-y-1"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>   
        <div id="products-section">
          <Products />
        </div>
      </main>
    </div>
  );
};

export default Home;