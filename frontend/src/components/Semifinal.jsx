import React, { useState, useEffect } from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import '../styles/Semifinal.css';

const Semifinal = ({ equipos, onSave }) => {
    const [equipo1, setEquipo1] = useState('');
    const [equipo2, setEquipo2] = useState('');
    const [equipo3, setEquipo3] = useState('');
    const [equipo4, setEquipo4] = useState('');

    const handleSelectChange = (event) => {
        const selectedTeam = event.target.value;
        const selectedName = event.target.name;

        switch (selectedName) {
            case 'equipo1':
                setEquipo1(selectedTeam);
                break;
            case 'equipo2':
                setEquipo2(selectedTeam);
                break;
            case 'equipo3':
                setEquipo3(selectedTeam);
                break;
            case 'equipo4':
                setEquipo4(selectedTeam);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (equipo1 && equipo2 && equipo3 && equipo4) {
            const equiposSeleccionados = [equipo1, equipo2, equipo3, equipo4];
            onSave(equiposSeleccionados);
        }
    }, [equipo1, equipo2, equipo3, equipo4]);

    const availableEquipos1 = equipos.filter(
        (equipo) =>
            equipo.id !== equipo2 &&
            equipo.id !== equipo3 &&
            equipo.id !== equipo4
    );

    const availableEquipos2 = equipos.filter(
        (equipo) =>
            equipo.id !== equipo1 &&
            equipo.id !== equipo3 &&
            equipo.id !== equipo4
    );

    const availableEquipos3 = equipos.filter(
        (equipo) =>
            equipo.id !== equipo1 &&
            equipo.id !== equipo2 &&
            equipo.id !== equipo4
    );

    const availableEquipos4 = equipos.filter(
        (equipo) =>
            equipo.id !== equipo1 &&
            equipo.id !== equipo2 &&
            equipo.id !== equipo3
    );

    return (
        <div className="semifinal-bracket">
            <div className="column">
                <select
                    className="team-select"
                    name="equipo1"
                    value={equipo1}
                    onChange={handleSelectChange}
                >
                    <option value=""></option>
                    {availableEquipos1.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="team-select"
                    name="equipo2"
                    value={equipo2}
                    onChange={handleSelectChange}
                >
                    <option value=""></option>
                    {availableEquipos2.map((equipo) => (
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
                    name="equipo3"
                    value={equipo3}
                    onChange={handleSelectChange}
                >
                    <option value=""></option>
                    {availableEquipos3.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
                <select
                    className="team-select"
                    name="equipo4"
                    value={equipo4}
                    onChange={handleSelectChange}
                >
                    <option value=""></option>
                    {availableEquipos4.map((equipo) => (
                        <option key={equipo.id} value={equipo.id} required>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Semifinal;
