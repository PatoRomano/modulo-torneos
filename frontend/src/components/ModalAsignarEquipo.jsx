import React, { useEffect, useState } from 'react';
import '../styles/Modal.css';

const ModalAsignarEquipo = ({ isOpen, onClose, onSubmit, onSeleccionChange }) => {

  // ---- TRAER EQUIPOS -----

  const [equipos, setEquipos] = useState([])
  const [equiposFiltrados, setEquiposFiltrados] = useState([])

  const fetchEquipos = async () => {
    const response = await fetch('http://localhost:3001/api/equipos/')
    const json = await response.json()
    if (response.ok) {
      setEquipos(json.equipos)

      const itemsFiltrados = json.equipos.filter((item) => item.activo === 1);
      setEquiposFiltrados(itemsFiltrados);
    }
  }

  useEffect(() => {
    fetchEquipos();
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
            Equipo:
          </label>
          <select name="equipo" value={valorSeleccionado} onChange={handleChange}>
            {equiposFiltrados && Array.isArray(equiposFiltrados) && equiposFiltrados.map((equipo) => (
              <option value={equipo.id} required>{equipo.nombre}</option>
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

export default ModalAsignarEquipo;
