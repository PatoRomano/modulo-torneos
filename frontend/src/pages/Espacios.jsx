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

const Espacios = () => {
    const { jsonData, updateJsonData } = useContext(DataContext);
    const handleClick = (elem, elem1) => {
        const newData = { 
            deporte: jsonData.deporte, 
            deporte_id: jsonData.deporte_id, 
            sede: jsonData.sede, 
            nombreSede: jsonData.nombreSede, 
            cancha: jsonData.cancha, 
            espacio: elem, nombreEspacio: elem1 
        };
        updateJsonData(newData);
    };

    // OBTENGO HISTORIAL DE NAVEGACIONES DEL USE NAVIGATE PARA BOTON VOLVER ATRAS
    const history = useNavigate()

    const espacios = [
        { id: 1, tipo_cancha: 'futbolcinco', sede: 'vasxmas', nombre_publico: "Futbol 5 (Unica)", activo: 1 },
        { id: 2, tipo_cancha: 'futbolcinco', sede: 'lacanchita', nombre_publico: "Futbol 5 (Adelante)", activo: 1 },
        { id: 3, tipo_cancha: 'futbolcinco', sede: 'lacanchita', nombre_publico: "Futbol 5 (Al fondo)", activo: 1 },
        { id: 4, tipo_cancha: 'futbolsiete', sede: 'vasxmas', nombre_publico: "Futbol 7 (Adelante)", activo: 1 },
        { id: 5, tipo_cancha: 'futbolsiete', sede: 'vasxmas', nombre_publico: "Futbol 7 (Costado)", activo: 1 },
        { id: 6, tipo_cancha: 'futbolsiete', sede: 'fairplay', nombre_publico: "Futbol 7 (Unica)", activo: 1 },
    ];
    const [espaciosFiltrados, setEspaciosFiltrados] = useState([])
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

    useEffect(() => {
        console.log(jsonData)
        const itemsFiltrados = espacios.filter((item) => item.tipo_cancha === jsonData.cancha && item.sede === jsonData.sede);
        setEspaciosFiltrados(itemsFiltrados);
    }, [])


    return (
        <div>
            <ButtonBack onClick={() => history(-1)} />
            <MainTitle title="Elige el espacio especifico" />

            {espaciosFiltrados && Array.isArray(espaciosFiltrados) && espaciosFiltrados.map((espacio) => (
                <Link to={"/instancias"} onClick={() => handleClick(espacio.id, espacio.nombre_publico)} className='card-link'>
                    <Card key={espacio.id} title={espacio.nombre_publico} imageSrc={ImageFairPlay} />
                </Link>
            ))}

        </div>
    )
}

export default Espacios
