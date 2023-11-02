import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Pages/about';
import Cart from './Pages/Cart';
import Home from './Pages/Home';
import Order from './Pages/Order';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<Order />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
