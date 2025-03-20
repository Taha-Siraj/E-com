import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Product from "./Product";
import Signup from "./Signup";
import Header from "./Header";
import Categories from "./Categories";
import Aboutus from "./Aboutus";
import { GlobalContext } from "../Context/Context";
import { MoonLoader } from "react-spinners";

const CustomRoutes = () => {
  const { state } = useContext(GlobalContext);
  const navigate = useNavigate();


  useEffect(() => {
    if (state?.isLogin === false) {
      console.log("Redirecting to login...");
      navigate("/login");
    }
  }, [state?.isLogin, navigate]);
  console.log("Current state:", state); 

  return (
    <>
      <Header />
      {state?.isLogin === true ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : state?.isLogin === false ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <p className="h-screen flex justify-center items-center">
          <MoonLoader />
        </p>
      )}
    </>
  );
};

export default CustomRoutes;
