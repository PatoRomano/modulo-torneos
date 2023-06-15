import { React, useContext, useEffect } from 'react';
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

    //SEDES
    const sedes = [
        { id: 1, nombre: 'vasxmas', nombre_publico: "Vas x Mas", activo: 1 },
        { id: 2, nombre: 'lacanchita', nombre_publico: "La Canchita", activo: 1 },
        { id: 3, nombre: 'fairplay', nombre_publico: "Fair Play", activo: 1 },
    ];


    //use Params
    const { id } = useParams();

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
    }, [])


    return (
        <div>
            <ButtonBack onClick={() => history(-1)} />
            <MainTitle title="Elige tu sede!" />

            {sedes && Array.isArray(sedes) && sedes.map((sede) => (
                <Link to={"/canchas"} onClick={() => handleClick(sede.nombre, sede.nombre_publico)} className='card-link'>
                    <Card key={sede.id} title={sede.nombre_publico} imageSrc={sede.nombre === "vasxmas" ? ImageVasXMas : sede.nombre === "lacanchita" ? ImageCanchita : ImageFairPlay} />
                </Link>
            ))}

        </div>
    )
}

export default Sedes
