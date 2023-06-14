import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//Components
import Card from '../components/Card';
import MainTitle from '../components/MainTitle';

const Invitado = () => {

    const [torneos, setTorneos] = useState([])
    const [torneosFiltrados, setTorneosFiltrados] = useState([])

    // TRAER LOS DEPORTES
    const fetchTorneos = async () => {
        const response = await fetch('http://localhost:3001/api/torneos/')
        const json = await response.json()
        if (response.ok) {
            setTorneos(json.torneos)

            const itemsFiltrados = json.torneos.filter((item) => item.activo === 1);
            setTorneosFiltrados(itemsFiltrados);
        }
    }

    useEffect(() => {
        fetchTorneos();
    }, [])


    return (
        <div>
            <MainTitle title="Torneos actuales" />
            <div className="tabla-btn-container">
                <div className="tabla-container">
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Deporte</th>
                                <th>Arbitro</th>
                                <th>Instancia Max.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {torneosFiltrados.map((fila) => (
                                <tr key={fila.id}>
                                    <td>
                                        {fila.id}
                                    </td>
                                    <td>
                                        <Link to={`/torneo/${fila.id}`} className='card-link'>
                                            {fila.nombre}
                                        </Link>
                                    </td>
                                    <td>
                                        {fila.deporte_id}
                                    </td>
                                    <td>
                                        {fila.arbitro_id}
                                    </td>
                                    <td>
                                        {fila.instancia_id}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Invitado
