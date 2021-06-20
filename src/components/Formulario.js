import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import PropTypes from 'prop-types';
import Error from './Error';

const Boton = styled.input`
margin-top:20px;
font-weight:bold;
font-size: 20px;
padding:10px;
background-color: #66A2FE;
border:none;
width: 100%;
border-radius:10px;
color:#fff;
transition: background-color .3s ease;

&:hover{
    background-color:#326ac0;
    cursor:pointer;
}

`;

const Formulario = ({setMoneda,setCriptoMoneda}) => {
  const [listaCripto, setListaCripto] = useState([]);
  const [error, setError] = useState(false);

    const MONEDAS=[
    { codigo:'USD', nombre:'Dolar de Estados unidos'},
    { codigo:'MXN', nombre:'Peso Mexicano'},
    { codigo:'COL', nombre:'Pesos Colombianos'},
    { codigo:'GBP', nombre:'Libra Esterlina'}

]

 

    //utilizar el useMoneda
const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', MONEDAS);

//utilizar useCriptomoneda

const [criptomoneda, SelectCripto] = useCriptomoneda ('Elige tu criptomoneda', '',listaCripto)

//llamar api
useEffect(() => {
    
const consultarAPI= async () =>{
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD' ;
     
    const resultado = await axios.get (url);

    setListaCripto(resultado.data.Data);
    
}
consultarAPI();
}, [])

const cotizarMoneda = e =>{
    e.preventDefault();

    if(moneda === '' || criptomoneda === ''){
        setError(true); 
        return;  
     }
     setError(false);
     setMoneda(moneda);
     setCriptoMoneda(criptomoneda);

};

    return ( <form
    onSubmit={cotizarMoneda}
    >
        {error ? <Error mensaje="Todos los campos son obligatorios"/>:null}
        <SelectMonedas/>
        <SelectCripto/>

        <Boton type="submit"
        value="calcular"
        />
    </form> );
}
Formulario.propTypes={
    setMoneda: PropTypes.object.isRequired,
    setCriptoMoneda: PropTypes.object.isRequired
}
export default Formulario;