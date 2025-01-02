import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/login'
import Conversas from './Components/Conversas/Conversas'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/conversas' element={<Conversas />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App