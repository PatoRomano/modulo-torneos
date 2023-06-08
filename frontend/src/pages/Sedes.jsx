import React from 'react';
import { Link } from 'react-router-dom';

//Components
import Card from '../components/Card';
import MainTitle from '../components/MainTitle';
import Hero from '../components/Hero';

//Images
import ImageVasXMas from '../assets/sedes/vasxmas.jpg';
import ImageCanchita from '../assets/sedes/lacanchita.jpg';
import ImageFairPlay from '../assets/sedes/fairplay.jpg';

import imgBg from '../assets/principales/world-cup-original.jpg';

function App() {
    const sedes = [
        { id: 1, nombre: 'vasxmas', nombre_publico: "Vas x Mas", activo: 1 },
        { id: 2, nombre: 'lacanchita', nombre_publico: "La Canchita", activo: 1 },
        { id: 3, nombre: 'fairplay', nombre_publico: "Fair Play", activo: 1 },
    ];
    /* 
        const fetchDeportes = async () => {
            const response = await fetch('http://localhost:3001/api/deportes/')
            const json = await response.json()
            if (response.ok) {
                setDeportes(json.deportes)
            }
        } 
    */

    /*     useEffect(() => {
            fetchDeportes();
        }, []) 
    */


    return (
        <div>
            <Hero imageSrc={imgBg} title="Crea torneos de cualquier deporte." />
            <MainTitle title="Elige tu sede!" />

            {sedes && Array.isArray(sedes) && sedes.map((sede) => (
                <Card key={sede.id} title={sede.nombre_publico} imageSrc={sede.nombre === "vasxmas" ? ImageVasXMas : sede.nombre === "lacanchita" ? ImageCanchita : ImageFairPlay} />
            ))}

        </div>
    )
}

export default App
