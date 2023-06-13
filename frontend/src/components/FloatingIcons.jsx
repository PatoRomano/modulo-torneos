import React from 'react';
import { RiUser2Fill, RiTeamFill, RiUserFill } from 'react-icons/ri';
import '../styles/FloatingIcons.css';
import { Link } from 'react-router-dom';

const FloatingIcons = () => {
    return (
        <div className="floating-icons">
            <div className="floating-icons__item">
                <Link to='/arbitros'>
                    <RiUser2Fill className="floating-icons__icon" />
                </Link>
                <span className="floating-icons__tooltip">Árbitros</span>
            </div>
            <div className="floating-icons__item">
                <Link to='/jugadores'>
                    <RiUserFill className="floating-icons__icon" />
                </Link>
                <span className="floating-icons__tooltip">Jugadores</span>
            </div>
            <div className="floating-icons__item">
                <Link to='/equipos'>
                    <RiTeamFill className="floating-icons__icon" />
                </Link>
                <span className="floating-icons__tooltip">Equipos</span>
            </div>
        </div>
    );
};

export default FloatingIcons;
