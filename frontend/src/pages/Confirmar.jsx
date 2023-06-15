import { React, useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

//Components
import MainTitle from '../components/MainTitle';
import ButtonBack from "../components/ButtonBack"


import ChosenInfo from '../components/ChosenInfo';

import '../styles/Calendar.css';


const Dias = () => {
    const { jsonData, updateJsonData } = useContext(DataContext);

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
            <MainTitle title="Confirma si los datos son correctos:" />
            <ChosenInfo precioJugador='1500' precioArbitro='500' />
            <div className='button-container'>
                <Link to="/">
                    <button className='btn-continuar'>Confirmar</button>
                </Link>
            </div>
        </div>
    )
}

export default Dias