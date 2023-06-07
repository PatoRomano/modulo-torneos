import React, { useState } from 'react';
import '../styles/Navbar.css'; // Importa el archivo CSS de estilos

const Navbar = () => {

  return (
    <nav className="navbar">
      <h1 className="navbar-title">
        <span className="title-sports">Sports</span>
        <span className="title-match">Match</span>
      </h1>
    </nav>
  );
};

export default Navbar;
