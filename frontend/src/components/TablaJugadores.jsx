import React, { useState, useEffect } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs'
import { AiFillPlusCircle } from 'react-icons/ai';

import '../styles/Tabla.css'
import ModalJugadores from './ModalJugadores';
import ErrorMessage from './ErrorMessage';
import { RiTeamFill } from 'react-icons/ri';
import ModalAsignarEquipo from './ModalAsignarEquipo';

const TablaJugadores = () => {

    // ----------------------------- OBTENER LISTADO DE JUGADORES -----------------------------------

    const [jugadores, setJugadores] = useState([]);

    const fetchJugadores = async () => {
        const response = await fetch('http://localhost:3001/api/jugadores/')
        const json = await response.json()
        if (response.ok) {
            setJugadores(json.jugadores)
        }
    }

    const agregarJugador = async () => {
        console.log('Hola');
    }


    useEffect(() => {
        fetchJugadores();
    }, [])

    // ----------------------------- FIN OBTENER LISTADO DE JUGADORES -----------------------------------



    // ----------------------------- CONTROLAR MENSAJE DE ERROR -----------------------------------
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCloseError = () => {
        setShowError(false);
    };


    // ----------------------------- FIN CONTROLAR MENSAJE DE ERROR -----------------------------------

    // ----------------------------- CONTROLAR MODAL CREAR JUGADOR -----------------------------------

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = async (form) => {
        const nombre = form.nombre.value;
        const apellido = form.apellido.value;
        const dni = form.dni.value;
        const fecha_nac = form.fecha_nac.value;

        const body = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            fecha_nac: fecha_nac,
        }

        try {
            const response = await fetch('http://localhost:3001/api/jugadores/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            if (data.error === "Ya existe") {
                setErrorMessage("Ya existe ese jugador.")
                setShowError(true);
            }
        } catch (error) {
            console.error(error);
        }

        handleCloseModal();
    };

    // ----------------------------- FIN CONTROLAR MODAL CREAR JUGADOR -----------------------------------

        // ----------------------------- CONTROLAR MODAL ASIGNAR EQUIPO -----------------------------------

        const [isModalAsignOpen, setIsModalAsignOpen] = useState(false);

        const handleOpenModalAsign = () => {
            setIsModalAsignOpen(true);
        };
    
        const handleCloseModalAsign = () => {
            setIsModalAsignOpen(false);
        };

        const [equipoId, setEquipoId] = useState(3);
        const [jugadorId, setJugadorId] = useState(null);
    
        const handleFormAsignSubmit = async (form) => {
            const equipo_id = equipoId;
    
            const body = {
                equipo_id: equipo_id,
            }
    
            try {
                const response = await fetch(`http://localhost:3001/api/jugadores/${jugadorId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
    
                const data = await response.json();
                if (data.error === "Ya existe") {
                    setErrorMessage("Ya existe ese jugador.")
                    setShowError(true);
                }
            } catch (error) {
                console.error(error);
            }
    
            handleCloseModalAsign();
        };
    
        // ----------------------------- FIN CONTROLAR MODAL ASIGNAR EQUIPO -----------------------------------

    // --------------------- CONTROLAR SELECT -----------------------

    const handleSeleccionChange = (valor) => {
        setEquipoId(valor);
    };


    return (
        <div className="tabla-btn-container">
            <ErrorMessage text={errorMessage} onClose={handleCloseError} show={showError} />
            <div className='btn-agregar-container'>
                <button className='btn-agregar' onClick={handleOpenModal}>
                    <AiFillPlusCircle />
                    Agregar nuevo
                </button>
                <ModalJugadores isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} />
            </div>
            <div className="tabla-container">
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Fecha nac.</th>
                            <th>Equipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jugadores.map((fila) => (
                            <tr key={fila.id} className={fila.disponible === 0 ? 'fila-roja' : ''}>
                                <td>{fila.id}</td>
                                <td>
                                    {fila.nombre}
                                </td>
                                <td>
                                    {fila.apellido}
                                </td>
                                <td>
                                    {fila.dni}
                                </td>
                                <td>
                                    {fila.fecha_nac}
                                </td>
                                <td>
                                    {fila.equipo_id ? fila.equipo_id : "No pertenece a ningun equipo"}
                                </td>
                                <td>
                                    <div className='btn-container'>
                                        {fila.equipo_id === null && (
                                            <button className='asignar-btn' title='Asignar equipo' onClick={() => {handleOpenModalAsign(fila.id);setJugadorId(fila.id)}}>
                                                <RiTeamFill />
                                            </button>
                                        )}
                                        <ModalAsignarEquipo isOpen={isModalAsignOpen} onClose={handleCloseModalAsign} onSubmit={handleFormAsignSubmit} onSeleccionChange={handleSeleccionChange} />
                                        <button className='editar-btn' title='Editar' onClick={() => editarFila(fila.id)}>
                                            <BsPencilSquare />
                                        </button>
                                        <button className='eliminar-btn' title='Eliminar' onClick={() => eliminarFila(fila.id)}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaJugadores;
