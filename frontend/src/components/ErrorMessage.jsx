import React from 'react';
import '../styles/ErrorMessage.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';


const ErrorMessage = ({ text, onClose, show }) => {
    return (
        <div className={`error-message ${show ? 'show' : ''}`}>
            <p className="error-text">{text}</p>
            <button className="close-button" onClick={onClose}>
                <AiOutlineCloseCircle className="close-icon" />
            </button>
        </div>
    );
};

export default ErrorMessage;
