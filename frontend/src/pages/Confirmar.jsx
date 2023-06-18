import { React, useContext, useEffect, useState } from 'react';
import { useNavigate, Link, json } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

//Components
import MainTitle from '../components/MainTitle';
import ButtonBack from "../components/ButtonBack"


import ChosenInfo from '../components/ChosenInfo';

import '../styles/Calendar.css';


const Confirmar = () => {
    const { jsonData, updateJsonData } = useContext(DataContext);

    const cantidadPartidos = jsonData.instancia === "semifinal" ? 3 : jsonData.instancia === "cuartos" ? 7 : 15;

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
        fetchTorneos();

        //fetchDeportes();
    }, [])

    const [torneos, setTorneos] = useState([])
    const [torneosFiltrados, setTorneosFiltrados] = useState([])

    // TRAER EL ID DEL TORNEO
    const fetchTorneos = async () => {
        const response = await fetch('http://localhost:3001/api/torneos/')
        const json = await response.json()
        if (response.ok) {
            setTorneos(json.torneos)

            const torneoMayorId = json.torneos.reduce((maxTorneo, torneo) => {
                return torneo.id > maxTorneo.id ? torneo : maxTorneo;
            });

            setTorneosFiltrados(torneoMayorId);
        }
    }


    const handleSubmit = async () => {

        console.log(torneosFiltrados.id);

        const bodyTorneo = {
            nombre: jsonData.nombre_torneo,
            deporte_id: jsonData.deporte_id,
            arbitro_id: jsonData.arbitro_id,
            instancia_id: jsonData.instancia_id
        };

        console.log(bodyTorneo);

        /*         try {
                    const response = await fetch('http://localhost:3001/api/torneos/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyTorneo)
                    });
        
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.error(error);
                } */



        let llave = 6;
        let cantPartidos = 3;
        let aumentoOrden = 1;
        let bodyPartido = {};
        if (jsonData.instancia === "cuartos") {
            llave = 8;
            cantPartidos = 5;
            aumentoOrden = 3;
        }
        jsonData.dias.map((dia) => {
            dia.horarios.map((horario) => {

                if (horario.orden >= cantPartidos) {
                    bodyPartido = {
                        torneo_id: torneosFiltrados.id + 1,
                        llave_id: llave + horario.orden,
                        fecha: dia.dia + horario.hora
                    }
                } else {
                    bodyPartido = {
                        torneo_id: torneosFiltrados.id + 1,
                        llave_id: llave + horario.orden,
                        equipo_uno_id: jsonData.equipos[horario.orden - 1],
                        equipo_dos_id: jsonData.equipos[horario.orden + aumentoOrden],
                        fecha: dia.dia + ' ' + horario.hora
                    }
                }

                console.log(bodyPartido)

                /*         try {
                const response = await fetch('http://localhost:3001/api/partidos/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyPartido)
                });
    
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            } */

            })
        })

        const bodyReserva = {
            dias: jsonData.dias,
        };

        /*         try {
        const response = await fetch('http://localhost:3001/api/getReservaPorFecha/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyReserva)
        });
 
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    } */

    };

    return (
        <div>
            <ButtonBack onClick={() => history(-1)} />
            <MainTitle title="Confirma si los datos son correctos:" />
            <ChosenInfo precioJugador='1500' precioArbitro='500' />
            <div className='button-container'>
                <Link to="/" onClick={handleSubmit}>
                    <button className='btn-continuar'>Confirmar</button>
                </Link>
            </div>
        </div>
    )
}

export default Confirmar
