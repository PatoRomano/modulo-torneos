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

import ChosenInfo from '../components/ChosenInfo';

const Dias = () => {
    const { jsonData, updateJsonData } = useContext(DataContext);
    const handleClick = (elem) => {
        const newData = { deporte: jsonData.deporte, sede: jsonData.sede, cancha: jsonData.cancha, espacio: jsonData.espacio, nombreEspacio: jsonData.nombreEspacio, instancia: elem };
        updateJsonData(newData);
    };

    // NAVIGATE PARA BOTON VOLVER ATRAS
    const history = useNavigate()

    //const [dias, setDias] = useState([])
    //const [diasFiltrados, setDiasFiltrados] = useState([])


/*     const fetchDeportes = async () => {
        const response = await fetch('http://localhost:3001/api/dias/')
        const json = await response.json()
        if (response.ok) {
            setDias(json.dias)

            const itemsFiltrados = json.dias.filter((item) => item.nombre != 'final');
            setDiasFiltradas(itemsFiltrados);
        }
    }
 */


    useEffect(() => {
        console.log(jsonData)

        //fetchDeportes();
    }, [])


    return (
        <div>
            <ButtonBack onClick={() => history(-1)} />
            <ChosenInfo precioJugador='1500' precioArbitro='500'/>
            <MainTitle title="Elige los dias y horarios" />

        </div>
    )
}

export default Dias
