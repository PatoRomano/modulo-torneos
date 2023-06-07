import React from 'react';
import { useEffect, useState } from 'react';

//Components
import Card from '../components/Card';
import MainTitle from '../components/MainTitle';
import Hero from '../components/Hero';

//Images
import ImageSoccer from '../assets/soccer.jpg';
import ImageHandball from '../assets/handball.jpg';
import ImagePaddle from '../assets/paddle.jpg';

import imgBg from '../assets/world-cup-original.jpg';

function App() {
    const [deportes, setDeportes] = useState(null)

    const fetchDeportes = async () => {
        const response = await fetch('http://localhost:3001/api/deportes/')
        const json = await response.json()
        if (response.ok) {
            setDeportes(json.deportes)
        }
    }

    useEffect(() => {
        fetchDeportes();
    }, [])


    return (
        <div>
            <Hero imageSrc={imgBg} title="Crea torneos de cualquier deporte." />
            <MainTitle title="Elige tu deporte!" />

            {deportes && Array.isArray(deportes) && deportes.map((deporte) => (
                <Card key={deporte.id} title={deporte.nombre_publico} imageSrc={deporte.nombre==="futbol"?ImageSoccer:deporte.nombre==="paddle"?ImagePaddle:ImageHandball}/>
            ))}

        </div>
    )
}

export default App
