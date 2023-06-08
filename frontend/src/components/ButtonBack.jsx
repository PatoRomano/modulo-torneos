import React from "react";
import '../styles/ButtonBack.css';

const ButtonBack = ({ onClick }) => {
    return (
        <button className="button-back" onClick={onClick}>Volver</button>
    );
}

export default ButtonBack;