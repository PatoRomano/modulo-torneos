import { React, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import PropTypes from 'prop-types';

import '../styles/ChosenInfo.css'

const ChosenInfo = ({ precioJugador, precioArbitro }) => {

    const { jsonData, updateJsonData } = useContext(DataContext);

    return (
        <div className='text-info'>
            <div className="main-text">
                <h1 className='main-info'>{jsonData.nombreEspacio}</h1>
                <h1 className='main-info'>{jsonData.instancia}</h1>
            </div>
            <br />
            <div className="text">
                {precioJugador && <h1 className='info'>Inscripcion por jugador: ${precioJugador}</h1>}
                {precioArbitro && <h1 className='info'>Arbitro por partido, por jugador: ${precioArbitro}</h1>}
            </div>
        </div>
    );
}

ChosenInfo.propTypes = {
    precioJugador: PropTypes.string.isRequired,
    precioArbitro: PropTypes.string.isRequired,
};

export default ChosenInfo