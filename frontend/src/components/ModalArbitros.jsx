import React from 'react';
import '../styles/Modal.css';

const ModalArbitros = ({ isOpen, onClose, onSubmit }) => {
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
          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalArbitros;
