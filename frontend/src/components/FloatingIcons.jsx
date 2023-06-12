import React from 'react';
import { RiUser2Fill, RiTeamFill, RiUserFill } from 'react-icons/ri';
import '../styles/FloatingIcons.css';

const FloatingIcons = () => {
    return (
        <div className="floating-icons">
            <div className="floating-icons__item">
                <RiUser2Fill className="floating-icons__icon" />
                <span className="floating-icons__tooltip">Árbitros</span>
            </div>
            <div className="floating-icons__item">
                <RiUserFill className="floating-icons__icon" />
                <span className="floating-icons__tooltip">Jugadores</span>
            </div>
            <div className="floating-icons__item">
                <RiTeamFill className="floating-icons__icon" />
                <span className="floating-icons__tooltip">Equipos</span>
            </div>
        </div>
    );
};

export default FloatingIcons;
