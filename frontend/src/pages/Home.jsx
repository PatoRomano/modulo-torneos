import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

//Components
import Card from '../components/Card';
import MainTitle from '../components/MainTitle';

//Images
import ImageSoccer from '../assets/deportes/soccer.jpg';
import ImageHandball from '../assets/deportes/handball.jpg';
import ImagePaddle from '../assets/deportes/paddle.jpg';

import FloatingIcons from '../components/FloatingIcons';

const Home = () => {

    const [deportes, setDeportes] = useState([])
    const [deportesFiltrados, setDeportesFiltrados] = useState([])

    const { jsonData, updateJsonData } = useContext(DataContext);

    const handleClick = (elem, elem2) => {
        const newData = { deporte: elem, deporte_id: elem2 };
        updateJsonData(newData);
    };

    // TRAER LOS DEPORTES
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


    return (
        <div>
            <MainTitle title="Elige tu deporte!" />
            <FloatingIcons/>

            {deportesFiltrados && Array.isArray(deportesFiltrados) && deportesFiltrados.map((deporte) => (
                <Link to={"/sedes"} onClick={() => handleClick(deporte.nombre, deporte.id)} className='card-link'>
                    <Card key={deporte.id} title={deporte.nombre_publico} imageSrc={deporte.nombre === "futbol" ? ImageSoccer : deporte.nombre === "paddle" ? ImagePaddle : ImageHandball} />
                </Link>
            ))}

        </div>
    )
}

export default Home
