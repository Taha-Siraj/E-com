import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Product from './Product'
import Signup from './Signup'
import Header from './Header'
import Fotter from './Fotter'
import Categories from './Categories'
import Aboutus from './Aboutus'

const CustomRoutes = () => {
  return (
    <>
    <Header/>
    <Routes>
        <Route path='/Login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/Categories' element={<Categories/>} />
        <Route path='/Aboutus' element={<Aboutus/>} />
        <Route path='/Product' element={<Product/>} />
        <Route path='/Signup' element={<Signup/>} />
    </Routes>
    </>
  )
}

export default CustomRoutes
