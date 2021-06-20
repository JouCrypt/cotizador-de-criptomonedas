import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
const Parrafo=styled.p`
font-size:18px;

span{
    font-weight:bold;
    
}
`;

const Precio=styled.p`
font-size:30px;
span{
    font-weight:bold;
    
}
`;


const Resultado=styled.div`
color: #FFF;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const Cotizacion = ({resultado}) => {
if (Object.keys(resultado).length === 0) return null;
  
    return ( 
        <Resultado>
            <Precio>El precio es: <span> {resultado.PRICE}</span></Precio>
            <Parrafo>Precio más alto del Día: <span> {resultado.HIGHDAY}</span></Parrafo>
            <Parrafo>Precio más bajo del Día: <span> {resultado.LOWDAY}</span></Parrafo>
            <Parrafo>Última actualización: <span> {resultado.LASTUPDATE}</span></Parrafo>
        </Resultado>

     );
}
Cotizacion.propTypes={
    resultado: PropTypes.object.isRequired
}
export default Cotizacion;