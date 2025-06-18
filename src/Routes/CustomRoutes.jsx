import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Home from '../Pages/Home';
import { GlobalContext } from '../Context/Context';

const CustomRoutes = () => {
  const { state, loading } = useContext(GlobalContext); // 👈 loading bhi lo

  // 👇 Jab tak user load ho raha ho, kuch bhi mat dikhao
  if (loading) {
    return <div className="text-white text-2xl text-center p-8">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={state.isLogin ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={state.isLogin ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={state.isLogin ? <Navigate to="/" replace /> : <Signup />} />
    </Routes>
  );
};

export default CustomRoutes;
