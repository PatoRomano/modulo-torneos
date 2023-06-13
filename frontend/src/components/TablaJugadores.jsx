import React, { useState, useEffect } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs'
import { AiFillPlusCircle } from 'react-icons/ai';

import '../styles/Tabla.css'

const TablaJugadores = () => {
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


    return (
        <div className="tabla-btn-container">
            <div className='btn-agregar-container'>
                <button className='btn-agregar' onClick={agregarJugador}>
                    <AiFillPlusCircle />
                    Agregar nuevo
                </button>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} />
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
                                    {fila.equipo_id}
                                </td>
                                <td>
                                    <div className='btn-container'>
                                        <button className='editar-btn' title='Editar' onClick={() => editarFila(fila.id)}>
                                            <BsPencilSquare />
                                        </button>
                                        <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit}/>
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
