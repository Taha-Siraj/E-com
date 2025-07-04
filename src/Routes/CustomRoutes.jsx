import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Home from '../Pages/Home';
import { GlobalContext } from '../Context/Context';
import Products from '../Pages/Products';
import AddProducts from '../admin/AddProducts';
import AddCategories from '../admin/AddCategories';
import  Navbar  from '../components/Navbar';
import Productsdetail from '../Pages/Productsdetail'
import Allblogs from '../Blog/Allblogs';
const CustomRoutes = () => {
  const { state, loading } = useContext(GlobalContext); 
  if (loading) {
    return <div className="text-white text-2xl text-center p-8">Loading...</div>;
  }

  return (
        <>
    <Routes>
      
      {state.isLogin ? (
        <>
          {state?.user?.user_role === 1 && (
            <>
              <Route path="/addproduct" element={<AddProducts />} />
              <Route path="/addcategories" element={<AddCategories />} />
            </>
          )}
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/blog" element={<Allblogs/>} />
          <Route path="/productsdetails/:id" element={<Productsdetail/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
        
        </>
  );
};

export default CustomRoutes;
