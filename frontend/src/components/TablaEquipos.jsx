import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import '../styles/Tabla.css'

const TablaEquipos = () => {
    const [equipos, setEquipos] = useState([]);

    const fetchEquipos = async () => {
        const response = await fetch('http://localhost:3001/api/equipos/')
        const json = await response.json()
        if (response.ok) {
            setEquipos(json.equipos)
        }
    }

    const agregarEquipo = async () => {
        console.log('Hola');
    }


    useEffect(() => {
        fetchEquipos();
    }, [])


    return (
        <div className="tabla-btn-container">
            <div className='btn-agregar-container'>
                <button className='btn-agregar' onClick={agregarEquipo}>
                    <BsPlusCircle />
                    Agregar nuevo
                </button>
            </div>
            <div className="tabla-container">
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Deporte</th>
                            <th>Torneo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipos.map((fila) => (
                            <tr key={fila.id} className={fila.disponible === 0 ? 'fila-roja' : ''}>
                                <td>{fila.id}</td>
                                <td>
                                    {fila.nombre}
                                </td>
                                <td>
                                    {fila.deporte_id}
                                </td>
                                <td>
                                    {fila.torneo_id ? fila.torneo_id : "No esta en ningún torneo."}
                                </td>
                                <td>
                                    <div className='btn-container'>
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

export default TablaEquipos;
