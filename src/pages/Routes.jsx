import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

    </div>
  );
};

export default CustomRoutes;