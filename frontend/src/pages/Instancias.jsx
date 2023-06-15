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


const Instancias = () => {
    const { jsonData, updateJsonData } = useContext(DataContext);
    const handleClick = (elem, elem2) => {
        const newData = { 
            deporte: jsonData.deporte, 
            deporte_id: jsonData.deporte_id, 
            sede: jsonData.sede, 
            nombreSede: jsonData.nombreSede, 
            cancha: jsonData.cancha, 
            espacio: jsonData.espacio, 
            nombreEspacio: jsonData.nombreEspacio, 
            instancia: elem, 
            instancia_id: elem2 
        };
        updateJsonData(newData);
    };

    // NAVIGATE PARA BOTON VOLVER ATRAS
    const history = useNavigate()

    const [instancias, setInstancias] = useState([])
    const [instanciasFiltradas, setInstanciasFiltradas] = useState([])


    const fetchDeportes = async () => {
        const response = await fetch('http://localhost:3001/api/instancias/')
        const json = await response.json()
        if (response.ok) {
            setInstancias(json.instancias)

            const itemsFiltrados = json.instancias.filter((item) => item.nombre != 'final');
            setInstanciasFiltradas(itemsFiltrados);
        }
    }

    useEffect(() => {
        console.log(jsonData)

        fetchDeportes();
    }, [])


    return (
        <div>
            <ButtonBack onClick={() => history(-1)} />
            <MainTitle title="Elige el tipo de torneo" />

            {instanciasFiltradas && Array.isArray(instanciasFiltradas) && instanciasFiltradas.map((instancia) => (
                <Link to='/dias' onClick={() => handleClick(instancia.nombre, instancia.id)} className='card-link'>
                    <Card key={instancia.id} title={instancia.nombre_publico} imageSrc={ImageFairPlay} />
                </Link>
            ))}

        </div>
    )
}

export default Instancias
