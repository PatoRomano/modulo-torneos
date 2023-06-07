import React from "react";
import PropTypes from 'prop-types';
import '../styles/MainTitle.css';

const MainTitle = ({ title }) => {
    return (
        <div className="main-title">
            <h1>{title}</h1>
        </div>
    );
};

MainTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default MainTitle;