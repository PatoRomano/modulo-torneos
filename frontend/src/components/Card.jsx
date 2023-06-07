import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css'; // Importa el archivo CSS de estilos


const Card = ({ imageSrc, title }) => {
    return (
        <div className="card">
            <img src={imageSrc} alt="Image" className="card-image" />
            <div className="card-content">
                <h1>{title}</h1>
            </div>
        </div>
    );
};

Card.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Card;