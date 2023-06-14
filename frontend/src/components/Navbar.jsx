import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importa el archivo CSS de estilos

const Navbar = () => {

  return (
    <nav className="navbar">
      <Link to="/" className='card-link'>
      <h1 className="navbar-title">
        <span className="title-sports">Sports</span>
        <span className="title-match">Match</span>
      </h1>
      </Link>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Inicio</Link>
        </li>
        <li className="navbar-item">
          <Link to="/admin" className="navbar-link">Administrador</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
