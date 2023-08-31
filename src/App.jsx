import './App.css'
import Countdown from './Countdown'
import data from './data'
import logo from './logo.png'

function App() {

  const parciales = data;

  parciales.sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime();
    const fechaB = new Date(b.fecha).getTime();

    if (fechaA < fechaB) return -1;
    if (fechaA > fechaB) return 1;
    return 0;
  });

  console.log(parciales)


  return (
    <div className='maxContainer'>
      <h1>Cuanto falta para el siguiente parcial o trabajo práctico crucial</h1>
      <div>
        <img src={logo} alt="" />
      </div>
      <p className='parrafito'>Tecnicatura Universitaria en Programación</p>

      {parciales.map((parcial) => (<Countdown key={parcial.id} {...parcial} />))}

    </div>
  )
}

export default App
