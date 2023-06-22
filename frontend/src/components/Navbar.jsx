import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsList, BsX } from 'react-icons/bs';
import '../styles/Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'menu-open' : ''}`}>
      <Link to="/" className='card-link'>
        <h1 className="navbar-title">
          <span className="title-sports">Sports</span>
          <span className="title-match">Match</span>
        </h1>
      </Link>
      <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <div className="navbar-toggle" onClick={toggleMenu}>
          {menuOpen ? <BsX /> : <BsList />}
        </div>

        <ul className={`navbar-list ${menuOpen ? 'open' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={toggleMenu}>
              Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/admin" className="navbar-link" onClick={toggleMenu}>
              Administrador
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
