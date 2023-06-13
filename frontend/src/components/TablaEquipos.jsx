import React, { useState, useEffect } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';

import '../styles/Tabla.css'
import ModalEquipos from './ModalEquipos';
import ErrorMessage from './ErrorMessage';

const TablaEquipos = () => {

    // ----------------------------- OBTENER LISTADO DE EQUIPOS -----------------------------------

    useEffect(() => {
        fetchEquipos();
    }, [])

    const [equipos, setEquipos] = useState([]);

    const fetchEquipos = async () => {
        const response = await fetch('http://localhost:3001/api/equipos/')
        const json = await response.json()
        if (response.ok) {
            setEquipos(json.equipos)
        }
    }

    // ----------------------------- FIN OBTENER LISTADO DE EQUIPOS -----------------------------------

    // ----------------------------- CONTROLAR MENSAJE DE ERROR -----------------------------------
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCloseError = () => {
        setShowError(false);
    };


    // ----------------------------- FIN CONTROLAR MENSAJE DE ERROR -----------------------------------

    // ----------------------------- CONTROLAR MODAL -----------------------------------

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [deporteId, setDeporteId] = useState(1);

    const handleFormSubmit = async (form) => {
        const nombre = form.nombre.value;
        const deporte_id = deporteId;

        const body = {
            nombre: nombre,
            deporte_id: deporte_id,
        }

        console.log(body);
        try {
            const response = await fetch('http://localhost:3001/api/equipos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            console.log(data);
            if (data.error !== null) {
                setErrorMessage("Ya existe ese equipo.")
                setShowError(true);
            }
        } catch (error) {
            console.error(error);
        }

        handleCloseModal();
    };

    // ----------------------------- FIN CONTROLAR MODAL -----------------------------------


    // --------------------- CONTROLAR SELECT -----------------------

    const handleSeleccionChange = (valor) => {
        setDeporteId(valor);
    };

    // --------------------- FIN CONTROLAR SELECT -----------------------


    return (
        <div className="tabla-btn-container">
            <ErrorMessage text={errorMessage} onClose={handleCloseError} show={showError} />
            <div className='btn-agregar-container'>
                <button className='btn-agregar' onClick={handleOpenModal}>
                    <AiFillPlusCircle />
                    Agregar nuevo
                </button>
                <ModalEquipos isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} onSeleccionChange={handleSeleccionChange} />
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
                                        <button className='editar-btn' title='Editar' onClick={() => editarFila(fila.id)}>
                                            <BsPencilSquare />
                                        </button>
                                        <ModalEquipos isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} onSeleccionChange={handleSeleccionChange} />
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
