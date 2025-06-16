import React from 'react'
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'

const CustomRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>      
      </Routes>
    </div>
  )
}
export default CustomRoutes

