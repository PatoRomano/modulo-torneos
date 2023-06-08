import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'


import Home from './pages/Home.jsx'
import Sedes from './pages/Sedes.jsx'
import Navbar from './components/Navbar.jsx'

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
              path="/futbol"
              element={<Sedes />}
            />
            <Route
              path="/paddle"
              element={<Sedes />}
            />
            <Route
              path="/handball"
              element={<Sedes />}
            />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
