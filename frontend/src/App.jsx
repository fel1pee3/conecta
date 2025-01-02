import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/login'
import Home from './Pages/Home/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App