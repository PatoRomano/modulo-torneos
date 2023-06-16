import React, { useState, useEffect } from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import '../styles/Cuartos.css';

const Cuartos = ({ equipos, onSave }) => {
    const [equiposSeleccionados, setEquiposSeleccionados] = useState([]);

    const handleSelectChange = (event, index) => {
        const selectedTeam = event.target.value;

        setEquiposSeleccionados((prevEquiposSeleccionados) => {
            const nuevosEquiposSeleccionados = [...prevEquiposSeleccionados];
            nuevosEquiposSeleccionados[index] = selectedTeam;
            return nuevosEquiposSeleccionados;
        });
    };

    useEffect(() => {
        if (equiposSeleccionados.length === 8) {
            onSave(equiposSeleccionados);
        }
    }, [equiposSeleccionados, onSave]);

    const availableEquipos = equipos.filter(
        (equipo) => !equiposSeleccionados.includes(equipo.id)
    );

    return (
        <div className="cuartos-bracket">
            <div className="column">
                <select
                    className="team-select"
                    name="equipo1"
                    value={equiposSeleccionados[0] || ''}
                    onChange={(event) => handleSelectChange(event, 0)}
                >
                    <option value=""></option>
                    {availableEquipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="team-select-two"
                    name="equipo2"
                    value={equiposSeleccionados[1] || ''}
                    onChange={(event) => handleSelectChange(event, 1)}
                >
                    <option value=""></option>
                    {availableEquipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="team-select"
                    name="equipo3"
                    value={equiposSeleccionados[2] || ''}
                    onChange={(event) => handleSelectChange(event, 2)}
                >
                    <option value=""></option>
                    {availableEquipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="team-select"
                    name="equipo4"
                    value={equiposSeleccionados[3] || ''}
                    onChange={(event) => handleSelectChange(event, 3)}
                >
                    <option value=""></option>
                    {availableEquipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div className="center">
                <div className="center-line"></div>
                <div className="trophy-icon">
                    <GiTrophyCup className="floating-icons__icon" />
                </div>
                <div className="center-line"></div>
            </div>
            <div className="column">
                <select
                    className="team-select"
                    name="equipo5"
                    value={equiposSeleccionados[4] || ''}
                    onChange={(event) => handleSelectChange(event, 4)}
                >
                    <option value=""></option>
                    {availableEquipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="team-select-two"
                    name="equipo6"
                    value={equiposSeleccionados[5] || ''}
                    onChange={(event) => handleSelectChange(event, 5)}
                >
                    <option value=""></option>
                    {availableEquipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="team-select"
                    name="equipo7"
                    value={equiposSeleccionados[6] || ''}
                    onChange={(event) => handleSelectChange(event, 6)}
                >
                    <option value=""></option>
                    {availableEquipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="team-select"
                    name="equipo8"
                    value={equiposSeleccionados[7] || ''}
                    onChange={(event) => handleSelectChange(event, 7)}
                >
                    <option value=""></option>
                    {availableEquipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Cuartos;
