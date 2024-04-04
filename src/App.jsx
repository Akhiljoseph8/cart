import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import Wishlist from './Pages/Wishlist'
import View from './Pages/View'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  

  return (
    <>
     <Header/>
     <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/wish' element={<Wishlist/>}/>
      <Route path='/view/:id' element={<View/>}/>
      <Route path='/*' element={<Home/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
