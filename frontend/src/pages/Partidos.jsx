import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

//Components
import Card from '../components/Card';
import MainTitle from '../components/MainTitle';
import ButtonBack from '../components/ButtonBack';

const Torneo = ({}) => {

    // NAVIGATE PARA BOTON VOLVER ATRAS
    const history = useNavigate()

    const { id } = useParams();

    const [partidos, setPartidos] = useState([])
    const [partidosFiltrados, setPartidosFiltrados] = useState([])

    // TRAER LOS DEPORTES
    const fetchPartidos = async () => {
        const response = await fetch('http://localhost:3001/api/partidos/')
        const json = await response.json()
        if (response.ok) {
            setPartidos(json.partidos)

            const itemsFiltrados = json.partidos.filter((item) => item.activo === 1);
            setPartidosFiltrados(itemsFiltrados);
        }
    }

    useEffect(() => {
        fetchPartidos();
    }, [])


    return (
        <div>
            <ButtonBack onClick={() => history(-1)} />
            <MainTitle title={`Partidos del torneo ${id}`} />
            <div className="tabla-btn-container">
                <div className="tabla-container">
                    <table className="tabla">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Llave</th>
                                <th>Equipo 1</th>
                                <th>Equipo 2</th>
                                <th>Goles Eq. 1</th>
                                <th>Goles Eq. 2</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partidosFiltrados.map((fila) => (
                                    <tr key={fila.id}>
                                        <td>
                                            {fila.id}
                                        </td>
                                        <td>
                                            {fila.llave_id}
                                        </td>
                                        <td>
                                            {fila.equipo_uno_id}
                                        </td>
                                        <td>
                                            {fila.equipo_dos_id}
                                        </td>
                                        <td>
                                            {fila.goles_equipo_uno? fila.goles_equipo_uno : "Aun no se jugo"}
                                        </td>
                                        <td>
                                            {fila.goles_equipo_uno? fila.goles_equipo_dos : ""}
                                        </td>
                                        <td>
                                            {fila.fecha}
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

export default Torneo
