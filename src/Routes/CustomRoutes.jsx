import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Home from '../Pages/Home';
import { GlobalContext } from '../Context/Context';
import Products from '../Pages/Products';
import Categories from '../Categories';
import Addproduct from '../Pages/Addproduct';

const CustomRoutes = () => {
  const { state, loading } = useContext(GlobalContext); 
  if (loading) {
    return <div className="text-white text-2xl text-center p-8">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={state.isLogin ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={state.isLogin ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={state.isLogin ? <Navigate to="/" replace /> : <Signup />} />
      <Route path="*" element={ <Navigate to='/login' /> } />
      <Route path="/product" element={<Products/>} />
      <Route path="/Categories" element={<Categories/>} />
      <Route path="/Addproduct" element={<Addproduct/>} />
    </Routes>
  );
};

export default CustomRoutes;
