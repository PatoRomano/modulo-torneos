import React from 'react';
import '../styles/Modal.css';

const ModalJugadores = ({ isOpen, onClose, onSubmit }) => {
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate()).toISOString().split('T')[0];

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event.target);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Formulario</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="nombre" required />
          </label>
          <label>
            Apellido:
            <input type="text" name="apellido" required />
          </label>
          <label>
            DNI:
            <input type="text" name="dni" required />
          </label>
          <label>
            Fecha Nac.:
            <input type="date" name="fecha_nac" max={minDate} required />
          </label>
          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalJugadores;
