import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import axios from 'axios';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
max-width: 900px;
margin:0 auto;
@media(min-width:992px){
  display:grid;
  grid-template-columns: repeat(2,  1fr);
  column-gap:2rem;

}`;

const Imagen = styled.img`
max-width:100%;
margin-top:5rem;
`;

const Heading = styled.h1`
font-family:"Bebas Neue", cursive;
color:#fff;
text-align: left;
font-weight:700;
font-size:50px;
margin-bottom:50px;
margin-top:80px;
&::after{
  content:'';
  width:200px;
  height:6px;
  background-color:#66A2FE;
  display:block;
}

`;




function App() {
const [moneda, setMoneda] = useState('');
const [criptomoneda, setCriptoMoneda] = useState('');
const [resultado, setResultado] = useState({});
const [cargando, setCargando] = useState(false);

useEffect(() => {
 const cotizarCriptomoneda=async ()=>{

  //evitamos la ejecucion la primera vez
if(moneda==='') return;

//consultar api para obtener cotizacion
const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

const resultado = await axios.get(url);

//mostrar spinner
setCargando(true);

//ocultar el spinner y mostrar el resultado
setTimeout(()=>
{//guardar cotizacion
  setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
  setCargando(false);
},3000 ); 
  

 };

 cotizarCriptomoneda();

  
}, [moneda, criptomoneda])

const Componente= (cargando) ? <Spinner/>: <Cotizacion resultado={resultado}/>
  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto">

        </Imagen>
       
      </div>
      <div>
         <Heading>
           Cotiza Cryptomonedas
           </Heading> 
           <Formulario 
           setCriptoMoneda={setCriptoMoneda}
           setMoneda={setMoneda}
           />
          {Componente}
      </div>
    </Contenedor>
  );
}

export default App;
