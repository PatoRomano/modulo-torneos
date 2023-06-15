import { React, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import PropTypes from 'prop-types';

import '../styles/ChosenInfo.css'

const ChosenInfo = ({ precioJugador, precioArbitro }) => {

    const { jsonData, updateJsonData } = useContext(DataContext);

    return (
        <div className='text-info'>
            <div className="main-text">
                <h1 className='main-info'>Sede: {jsonData.sede}</h1>
                <h1 className='main-info'>Espacio: {jsonData.nombreEspacio}</h1>
                <h1 className='main-info'>Instancia máxima: {jsonData.instancia}</h1>
                {jsonData.dias && (
                    <div className="dias-info">
                        {jsonData.dias.map((dia, index) => (
                            <div key={index}>
                                <h3>El día: {dia.dia}</h3>
                                <div className='time-slots'>
                                    {dia.horarios.map((horario, index) => (
                                        <div className='slot' key={index}>{horario}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <br />
            <div className="text">
                {precioJugador && <h1 className='info'>Inscripción por jugador: ${precioJugador}</h1>}
                {precioArbitro && <h1 className='info'>Árbitro por partido, por jugador: ${precioArbitro}</h1>}
            </div>
        </div>
    );
}

ChosenInfo.propTypes = {
    precioJugador: PropTypes.string.isRequired,
    precioArbitro: PropTypes.string.isRequired,
};

export default ChosenInfo