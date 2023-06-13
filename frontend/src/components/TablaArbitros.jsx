import React, { useState, useEffect } from 'react';

import { FaTrashAlt, FaArrowDown } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';

import '../styles/Tabla.css'

const TablaArbitros = () => {
    const [arbitros, setArbitros] = useState([]);

    const fetchArbitros = async () => {
        const response = await fetch('http://localhost:3001/api/arbitros/')
        const json = await response.json()
        if (response.ok) {
            setArbitros(json.arbitros)
        }
    }

    const agregarArbitro = async () => {
        console.log('Hola');
    }


    useEffect(() => {
        fetchArbitros();
    }, [])


    return (
        <div className="tabla-btn-container">
            <div className='btn-agregar-container'>
                <button className='btn-agregar' onClick={agregarArbitro}>
                    <AiFillPlusCircle />
                    Agregar nuevo
                </button>
            </div>
            <div className="tabla-container">
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arbitros.map((fila) => (
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
                                    <div className='btn-container'>
                                        <button className='editar-btn' title='Editar' onClick={() => editarFila(fila.id)}>
                                            <BsPencilSquare />
                                        </button>
                                        <button className='desactivar-btn' title='Desactivar' onClick={() => eliminarFila(fila.id)}>
                                            <FaArrowDown />
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

export default TablaArbitros;
