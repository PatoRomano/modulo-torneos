import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

//Components
import Card from '../components/Card';
import MainTitle from '../components/MainTitle';
import Hero from '../components/Hero';

//Images
import ImageSoccer from '../assets/deportes/soccer.jpg';
import ImageHandball from '../assets/deportes/handball.jpg';
import ImagePaddle from '../assets/deportes/paddle.jpg';

import imgBg from '../assets/principales/world-cup-original.jpg';

function App() {

    const [deportes, setDeportes] = useState([])
    const [deportesFiltrados, setDeportesFiltrados] = useState([])

    const { jsonData, updateJsonData } = useContext(DataContext);

    const handleClick = (elem) => {
        const newData = { deporte: elem };
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
            <Hero imageSrc={imgBg} title="Crea torneos de cualquier deporte." />
            <MainTitle title="Elige tu deporte!" />

            {deportesFiltrados && Array.isArray(deportesFiltrados) && deportesFiltrados.map((deporte) => (
                <Link to={"/" + deporte.nombre} onClick={() => handleClick(deporte.nombre)} className='card-link'>
                    <Card key={deporte.id} title={deporte.nombre_publico} imageSrc={deporte.nombre === "futbol" ? ImageSoccer : deporte.nombre === "paddle" ? ImagePaddle : ImageHandball} />
                </Link>
            ))}

        </div>
    )
}

export default App
