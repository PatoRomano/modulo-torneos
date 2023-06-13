import React, { useState, useEffect } from 'react';

import { FaTrashAlt, FaArrowDown } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { AiFillPlusCircle } from 'react-icons/ai';

import '../styles/Tabla.css'
import Modal from './ModalEquipos';
import ErrorMessage from './ErrorMessage';

const TablaArbitros = () => {

    // ----------------------------- CONTROLAR MODAL -----------------------------------

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

        const body = {
            nombre: nombre,
            apellido: apellido,
            dni: dni,
        }

        try {
            const response = await fetch('http://localhost:3001/api/arbitros/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            console.log(data);
            if (data.error !== null) {
                setErrorMessage("Ya existe ese árbitro.")
                setShowError(true);
            }
        } catch (error) {
            console.error(error);
        }

        handleCloseModal();
    };

    // ----------------------------- FIN CONTROLAR MODAL -----------------------------------

    // ----------------------------- CONTROLAR MENSAJE DE ERROR -----------------------------------
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCloseError = () => {
        setShowError(false);
    };


    // ----------------------------- FIN CONTROLAR MENSAJE DE ERROR -----------------------------------

    // ----------------------------- OBTENER LISTADO DE ARBITROS -----------------------------------

    const [arbitros, setArbitros] = useState([]);

    const fetchArbitros = async () => {
        const response = await fetch('http://localhost:3001/api/arbitros/')
        const json = await response.json()
        if (response.ok) {
            setArbitros(json.arbitros)
        }
    }

    useEffect(() => {
        fetchArbitros();
    }, [])

    // ----------------------------- FIN OBTENER LISTADO DE ARBITROS -----------------------------------


    return (
        <div className="tabla-btn-container">
            <ErrorMessage text={errorMessage} onClose={handleCloseError} show={showError} />
            <div className='btn-agregar-container'>
                <button className='btn-agregar' onClick={handleOpenModal}>
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
                                        <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleFormSubmit} />
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
