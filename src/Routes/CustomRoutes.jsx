import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Home from '../Pages/Home';
import { GlobalContext } from '../Context/Context';

const CustomRoutes = () => {
  const { state } = useContext(GlobalContext);

  return (
    <Routes>
      <Route path="/" element={state.isLogin ? <Home /> : <Navigate to="/login" replace />}/>

      <Route path="/login" element={state.isLogin ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/signup" element={state.isLogin ? <Navigate to="/" replace /> : <Signup />}
      />
    </Routes>
  );
};

export default CustomRoutes;
