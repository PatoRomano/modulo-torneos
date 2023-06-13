import React, { useEffect, useState } from 'react';
import '../styles/Modal.css';

const ModalEquipos = ({ isOpen, onClose, onSubmit, onSeleccionChange }) => {

  // ---- TRAER DEPORTES -----
  const [deportes, setDeportes] = useState([])
  const [deportesFiltrados, setDeportesFiltrados] = useState([])

  const fetchDeportes = async () => {
    const response = await fetch('http://localhost:3001/api/deportes/')
    const json = await response.json()
    if (response.ok) {
      setDeportes(json.deportes)

      const itemsFiltrados = json.deportes.filter((item) => item.activo === 1);
      setDeportesFiltrados(itemsFiltrados);
    }
  }

  useEffect(() => {
    fetchDeportes();
  }, [])

    // --------------- HANDLE SELECT ---------------

    const [valorSeleccionado, setValorSeleccionado] = useState('');

    const handleChange = (event) => {
      const valor = event.target.value;
      setValorSeleccionado(valor);
      onSeleccionChange(valor);
    };

  // ------------------------ HANDLE MODAL --------------
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
            Deporte:
          </label>
          <select name="deporte" value={valorSeleccionado} onChange={handleChange}>
            {deportesFiltrados && Array.isArray(deportesFiltrados) && deportesFiltrados.map((deporte) => (
              <option value={deporte.id} required>{deporte.nombre_publico}</option>
            ))}
          </select>
          <div className="modal-buttons">
            <button type="submit">Guardar</button>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEquipos;
