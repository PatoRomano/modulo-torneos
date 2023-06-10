import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'


import Home from './pages/Home.jsx'
import Sedes from './pages/Sedes.jsx'
import Navbar from './components/Navbar.jsx'
import Canchas from './pages/Canchas.jsx'
import Espacios from './pages/Espacios.jsx'

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
          <Route
            path="/espacios"
            element={<Espacios />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
