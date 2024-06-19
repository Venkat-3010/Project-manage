import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Board from './components/Board/Board'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/board' element={<Board />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
