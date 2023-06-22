import { React, useContext, useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

//Components
import Card from '../components/Card';
import MainTitle from '../components/MainTitle';
import ButtonBack from "../components/ButtonBack"

//Images
import ImageVasXMas from '../assets/sedes/vasxmas.jpg';
import ImageCanchita from '../assets/sedes/lacanchita.jpg';
import ImageFairPlay from '../assets/sedes/fairplay.jpg';

const Sedes = () => {
    // CONTEXTO
    const { jsonData, updateJsonData } = useContext(DataContext);
    const handleClick = (elem, elem2) => {
        const newData = {
            deporte: jsonData.deporte,
            deporte_id: jsonData.deporte_id,
            sede: elem,
            nombreSede: elem2
        };
        updateJsonData(newData);
    };

    // NAVIGATE PARA BOTON VOLVER ATRAS
    const history = useNavigate()


    useEffect(() => {
        console.log(jsonData)
        fetchSedes();
    }, [])

    const [sedes, setSedes] = useState([]);
    const fetchSedes = async () => {
        try {
            const response = await fetch('http://192.168.149.239:3000/empresasFutbol/')
            const json = await response.json();
            console.log(json);
            setSedes(json)
        } catch (error) {
            console.log(error);
        }
    }


    //SEDES
    /*     const sedes = [
            { id: 1, nombre: 'vasxmas', nombre_publico: "Vas x Mas", activo: 1 },
            { id: 2, nombre: 'lacanchita', nombre_publico: "La Canchita", activo: 1 },
            { id: 3, nombre: 'fairplay', nombre_publico: "Fair Play", activo: 1 },
        ]; */


    //use Params
    const { id } = useParams();


    return (
        <div>
            <ButtonBack onClick={() => history(-1)} />
            <MainTitle title="Elige tu sede!" />

            {sedes && Array.isArray(sedes) && sedes.map((sede) => (
                <Link to={"/canchas"} onClick={() => handleClick(sede.id, sede.nombre)} className='card-link'>
                    <Card key={sede.id} title={sede.nombre} imageSrc={ImageCanchita} />
                </Link>
            ))}

        </div>
    )
}

export default Sedes
