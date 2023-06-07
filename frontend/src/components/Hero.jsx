import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Hero.css'; // Importa el archivo CSS de estilos

const Hero = ({ imageSrc, title }) => {
    const backgroundImageStyle = {
        backgroundImage: `url(${imageSrc})`,
    };

    return (
        <div className="hero" style={backgroundImageStyle}>
            <div className="overlay">
                <h1 className="title">{title}</h1>
            </div>
        </div>
    );
};

Hero.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Hero;
