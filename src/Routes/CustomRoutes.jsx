import React, { useContext, useState } from 'react'
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import { GlobalContext } from '../Context/Context'

const CustomRoutes = () => {

  const {state } = useContext(GlobalContext)
  return (
    <div>
      {(state.isLogin === true) ?
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>      
      </Routes>
      :
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>      
      </Routes>
      }
      
    </div>
  )
}
export default CustomRoutes

