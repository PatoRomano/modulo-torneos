import { React } from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import MainTitle from '../components/MainTitle';
import ButtonBack from "../components/ButtonBack";
import TablaArbitros from '../components/TablaArbitros';
import FloatingIcons from '../components/FloatingIcons';

const Lista = ({tabla, titulo}) => {

    // NAVIGATE PARA BOTON VOLVER ATRAS
    const history = useNavigate()

    return (
        <div>
            <ButtonBack onClick={() => history(-1)} />
            <MainTitle title={titulo} />
            <FloatingIcons/>
            {tabla}
        </div>
    )
}

export default Lista
