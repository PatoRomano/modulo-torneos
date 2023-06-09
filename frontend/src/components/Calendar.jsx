import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Calendar.css'
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import { format } from 'date-fns';
import MainTitle from './MainTitle';
import Semifinal from './Semifinal';
import Cuartos from './Cuartos';
import baseUrl from '../assets/server';


const Calendar = () => {

    useEffect(() => {
        fetchArbitros();
        fetchEquipos();
        fetchUnavailableSlots(selectedDate);
    }, [])

    const minDate = new Date;
    minDate.setDate(minDate.getDate() + 1);

    const { jsonData, updateJsonData } = useContext(DataContext);

    const maxPartidos = jsonData.instancia === "semifinal" ? 3 : jsonData.instancia === "cuartos" ? 7 : 15;

    const MAX_SELECTED_SLOTS = maxPartidos;

    const [unavailableSlots, setUnavailableSlots] = useState([]);

const fetchUnavailableSlots = async (fecha) => {
        console.log(format(new Date(fecha), 'dd-MM-yyyy'))
        try {
            const response = await fetch(`${baseUrl}getReservaPorFecha/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_espacio: jsonData.espacio,
                    fecha: format(new Date(fecha), 'dd-MM-yyyy')
                })
            });
            const json = await response.json();
            console.log(json);
            setUnavailableSlots(json);
        } catch (error) {
            console.log(error);
        }
    }

/*     const unavailableSlots = [
        { hora_inicio: "20:00" },
        { hora_inicio: "16:00" }
    ]; */

    const [selectedSlots, setSelectedSlots] = useState({});
    const [selectedDate, setSelectedDate] = useState(minDate);

    const handleSlotClick = (slot) => {
        const isSelected = selectedSlots[selectedDate]?.includes(slot);
        const selectedDaySlots = selectedSlots[selectedDate] || [];
        let updatedSlots = { ...selectedSlots };


        if (isSelected) {
            const updatedDaySlots = selectedDaySlots.filter((s) => s !== slot);
            updatedSlots[selectedDate] = updatedDaySlots;
        } else {
            const totalSelectedSlots = Object.values(selectedSlots).flat();
            if (totalSelectedSlots.length < MAX_SELECTED_SLOTS) {
                if (!updatedSlots[selectedDate]) {
                    updatedSlots[selectedDate] = [];
                }
                updatedSlots[selectedDate].push(slot);
            }
        }

        setSelectedSlots(updatedSlots);
    };

    const deselectAllSlots = (newDate) => {
        fetchUnavailableSlots(newDate);
        const hasSelectedSlots = Object.keys(selectedSlots).length > 0;
        const isSameDay = newDate && newDate.toDateString() === selectedDate?.toDateString();

        if (hasSelectedSlots && !isSameDay) {
            setSelectedSlots({ ...selectedSlots, [selectedDate]: selectedSlots[selectedDate] || [] });
        }

        setSelectedDate(newDate);
    };

    const renderSlots = () => {
        const timeSlots = [
            { start: '16:00', end: '17:00' },
            { start: '17:00', end: '18:00' },
            { start: '18:00', end: '19:00' },
            { start: '19:00', end: '20:00' },
            { start: '20:00', end: '21:00' },
            { start: '21:00', end: '22:00' },
            { start: '22:00', end: '23:00' },
            { start: '23:00', end: '00:00' },
        ];

        const slots = selectedSlots[selectedDate] || [];
        const totalSelectedSlots = Object.values(selectedSlots).flat();
        const isMaxSlotsReached = totalSelectedSlots.length >= MAX_SELECTED_SLOTS;

        return timeSlots.map((slot, index) => {
            const isUnavailable = unavailableSlots.find(unavailableSlot => unavailableSlot.hora_inicio === slot.start);
            const isSelected = slots.includes(slot.start);

            const slotClass = `slot ${isSelected ? 'selected' : ''} ${isMaxSlotsReached ? 'disabled' : ''} ${isUnavailable ? 'unavailable' : ''}`;

            return (
                <div
                    key={index}
                    className={slotClass}
                    onClick={() => handleSlotClick(slot.start)}
                >
                    {slot.start}
                </div>
            );
        });
    };


    const renderSelectedSlots = () => {
        return Object.keys(selectedSlots).map((date) => {
            const slots = selectedSlots[date];

            if (slots.length > 0) {
                return (
                    <div key={date}>
                        <h3>{new Date(date).toLocaleDateString()}</h3>
                        <div className='time-slots'>
                            {slots.map((slot, index) => (
                                <div className='slot' key={index}>{slot}</div>
                            ))}
                        </div>
                    </div>
                );
            }

            return null;
        });
    };

    // ---------- ACTUALIZAR DATA CONTEXT -------------------------------------------------------------------

    /*     Object.keys(selectedSlots[date]).map((hour, index) => ({
            hora: selectedSlots[date][index],
            orden: i,
        }, i++)), */

    const handleClick = () => {
        let i = 1;
        const horarios = [];
        const horariosPorDia = {};

        const horariosEnviar = [];
        const horariosPorDiaEnviar = [];

        Object.keys(selectedSlots).forEach((date) => {
            const horariosEnviar = [];
            selectedSlots[date].forEach((hour) => {
                horariosEnviar.push(hour);
            });
            horariosPorDiaEnviar[date] = horariosEnviar;
        });

        Object.keys(selectedSlots).forEach((date) => {
            const horarios = [];
            selectedSlots[date].forEach((hour) => {
                horarios.push({
                    hora: hour,
                    orden: i,
                });
                i++;
            });
            horariosPorDia[date] = horarios;
        });

        const newData = {
            deporte: jsonData.deporte,
            deporte_id: jsonData.deporte_id,
            sede: jsonData.sede,
            nombreSede: jsonData.nombreSede,
            cancha: jsonData.cancha,
            cancha_id: jsonData.cancha_id,
            espacio: jsonData.espacio,
            nombreEspacio: jsonData.nombreEspacio,
            instancia: jsonData.instancia,
            instancia_id: jsonData.instancia_id,
            dias: Object.keys(selectedSlots).map((date) => ({
                dia: format(new Date(date), 'dd/MM/yyyy'),
                horarios: horariosPorDia[date],
            })),
            nombre_torneo: inputValue,
            arbitro_id: valorSeleccionado,
            arbitro: nombreArbitroSeleccionado,
            equipos: equiposSeleccionados,
            nombreSolicitante: inputName,
            apellidoSolicitante: inputLastname,
            dniSolicitante: inputDNI,
            mailSolicitante: inputMail,
            contactoSolicitante: inputContact,
            diasEnviar: Object.keys(selectedSlots).map((date) => ({
                dia: format(new Date(date), 'dd/MM/yyyy'),
                horarios: horariosPorDiaEnviar[date],
            }))
        };
        updateJsonData(newData);
        console.log(newData);
    };

    const canContinue = Object.values(selectedSlots).flat().length === MAX_SELECTED_SLOTS;

    const [inputValue, setInputValue] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputLastname, setInputLastname] = useState('');
    const [inputDNI, setInputDNI] = useState('');
    const [inputMail, setInputMail] = useState('');
    const [inputContact, setInputContact] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleNameChange = (event) => {
        setInputName(event.target.value);
    };

    const handleLastnameChange = (event) => {
        setInputLastname(event.target.value);
    };

    const handleDNIChange = (event) => {
        setInputDNI(event.target.value);
    };

    const handleMailChange = (event) => {
        setInputMail(event.target.value);
    };

    const handleContactChange = (event) => {
        setInputContact(event.target.value);
    };

    const [valorSeleccionado, setValorSeleccionado] = useState(1);
    const [nombreArbitroSeleccionado, setNombreArbitroSeleccionado] = useState('Juan Perez');

    const handleSelectChange = (event) => {
        const valor = event.target.value;
        const nombre = event.target.options[event.target.selectedIndex].text;
        setValorSeleccionado(parseInt(valor));
        setNombreArbitroSeleccionado(nombre);
    };

    // ----------------------------- OBTENER LISTADO DE ARBITROS -----------------------------------

    const [arbitros, setArbitros] = useState([]);

    const fetchArbitros = async () => {
        const response = await fetch('http://localhost:3001/api/arbitros/')
        const json = await response.json()
        if (response.ok) {
            setArbitros(json.arbitros)
        }
    }

    // ----------------------------- FIN OBTENER LISTADO DE ARBITROS -----------------------------------

    // ----------------------------- OBTENER LISTADO DE EQUIPOS -----------------------------------

    const [equipos, setEquipos] = useState([]);
    const [equiposFiltrados, setEquiposFiltrados] = useState([]);

    const fetchEquipos = async () => {
        const response = await fetch('http://localhost:3001/api/equipos/')
        const json = await response.json()
        if (response.ok) {
            setEquipos(json.equipos)
            setEquiposFiltrados(json.equipos.filter(equipo => equipo.deporte_id === 1));
        }
    }

    // ----------------------------- FIN OBTENER LISTADO DE EQUIPOS -----------------------------------


    const [equiposSeleccionados, setEquiposSeleccionados] = useState([]);

    const handleSaveEquipos = (equipos) => {
        setEquiposSeleccionados(equipos);
    };

    return (
        <div className='calendar-container'>
            <div className='calendar'>
                <DatePicker
                    selected={selectedDate}
                    onChange={deselectAllSlots}
                    dateFormat="dd-MM-yyyy"
                    className="date-picker"
                    minDate={minDate}
                />
                <div className='time-slots'>
                    {renderSlots()}
                </div>
                <div className='line'></div>
                <div>
                    <h2>Horarios seleccionados:</h2>
                    {renderSelectedSlots()}
                </div>
                <div className='button-container'>
                    <h1>Selecciona el arbitro:</h1>
                    <select name="arbitro" value={valorSeleccionado.toString()} onChange={handleSelectChange}>
                        {arbitros && Array.isArray(arbitros) && arbitros.map((arbitro) => (
                            <option key={arbitro.id} value={arbitro.id} required>{arbitro.nombre + ' ' + arbitro.apellido + ' ⭐⭐⭐'}</option>
                        ))}
                    </select>
                </div>
                <div className='button-container'>
                    <h1>Ingresa el nombre del torneo:</h1>
                    <input className="nombre-torneo" type="text" value={inputValue} onChange={handleInputChange} required />
                </div>
                <div>
                    {maxPartidos === 3 && <Semifinal equipos={equiposFiltrados} onSave={handleSaveEquipos} />}
                    {maxPartidos === 7 && <Cuartos equipos={equiposFiltrados} onSave={handleSaveEquipos} />}
                </div>
                <br />
                <div className='line'></div>

                <div className='button-container'>
                    <h1>Ingresa el nombre del solicitante:</h1>
                    <input className="nombre-torneo" type="text" value={inputName} onChange={handleNameChange} required />
                </div>
                <div className='button-container'>
                    <h1>Ingresa el apellido del solicitante:</h1>
                    <input className="nombre-torneo" type="text" value={inputLastname} onChange={handleLastnameChange} required />
                </div>
                <div className='button-container'>
                    <h1>Ingresa el dni del solicitante:</h1>
                    <input className="nombre-torneo" type="text" value={inputDNI} onChange={handleDNIChange} required />
                </div>
                <div className='button-container'>
                    <h1>Ingresa el correo del solicitante:</h1>
                    <input className="nombre-torneo" type="text" value={inputMail} onChange={handleMailChange} required />
                </div>
                <div className='button-container'>
                    <h1>Ingresa el contacto del solicitante:</h1>
                    <input className="nombre-torneo" type="text" value={inputContact} onChange={handleContactChange} required />
                </div>
                {canContinue && inputValue !== '' && <div className='button-container'>
                    <Link to="/confirmar" onClick={handleClick}>
                        <button className='btn-continuar'>Continuar</button>
                    </Link>
                </div>}
            </div>
        </div>
    );
};

export default Calendar;
