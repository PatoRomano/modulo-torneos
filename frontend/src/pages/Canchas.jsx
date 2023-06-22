import { React, useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

//Components
import Card from '../components/Card';
import MainTitle from '../components/MainTitle';
import ButtonBack from "../components/ButtonBack"

//Images
import ImageVasXMas from '../assets/sedes/vasxmas.jpg';
import ImageCanchita from '../assets/sedes/lacanchita.jpg';
import ImageFairPlay from '../assets/sedes/fairplay.jpg';
import baseUrl from '../assets/server';

const Canchas = () => {
    const { jsonData, updateJsonData } = useContext(DataContext);
    const handleClick = (elem, elem2) => {
        const newData = {
            deporte: jsonData.deporte,
            deporte_id: jsonData.deporte_id,
            sede: jsonData.sede,
            nombreSede: jsonData.nombreSede,
            cancha: elem,
            cancha_id: elem2,
        };
        updateJsonData(newData);
    };

    // NAVIGATE PARA BOTON VOLVER ATRAS
    const history = useNavigate()

    /*     const canchas = [
            { id: 1, nombre: 'futbolcinco', nombre_publico: "Futbol 5", activo: 1 },
            { id: 2, nombre: 'futbolsiete', nombre_publico: "Futbol 7", activo: 1 },
        ]; */

    const [canchas, setCanchas] = useState([]);
    const fetchCanchas = async () => {
        try {
            const response = await fetch(`${baseUrl}canchas/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id_espacio: jsonData.sede })
            });
            const json = await response.json();
            setCanchas(json);
            console.log(json)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(jsonData);
        fetchCanchas();
    }, [])




    return (
        <div>
            <ButtonBack onClick={() => history(-1)} />
            <MainTitle title="Elige el tipo de cancha" />

            {canchas && Array.isArray(canchas) && canchas.map((cancha) => (
                <Link to={"/espacios"} onClick={() => handleClick(cancha.nombre, cancha.id)} className='card-link'>
                    <Card key={cancha.id} title={cancha.nombre} imageSrc={ImageFairPlay} />
                </Link>
            ))}

        </div>
    )
}

export default Canchas
