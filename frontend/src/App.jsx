import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'


import Home from './pages/Home.jsx'
import Sedes from './pages/Sedes.jsx'
import Navbar from './components/Navbar.jsx'
import Canchas from './pages/Canchas.jsx'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Navbar /> 
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/sedes"
              element={<Sedes />}
            />
            <Route
              path="/canchas"
              element={<Canchas />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
