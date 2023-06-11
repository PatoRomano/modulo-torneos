import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'


import Home from './pages/Home.jsx'
import Sedes from './pages/Sedes.jsx'
import Navbar from './components/Navbar.jsx'
import Canchas from './pages/Canchas.jsx'
import Espacios from './pages/Espacios.jsx'
import Instancias from './pages/Instancias.jsx'
import Dias from './pages/Dias.jsx'

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
          <Route
            path="/instancias"
            element={<Instancias />}
          />
          <Route
            path="/dias"
            element={<Dias />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
