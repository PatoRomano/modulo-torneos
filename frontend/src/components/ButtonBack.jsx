import React from "react";
import '../styles/ButtonBack.css';

const ButtonBack = ({ onClick }) => {
    return (
        <div className="btn-back-container">
            <button className="button-back" onClick={onClick}>Volver</button>
        </div>
    );
}

export default ButtonBack;