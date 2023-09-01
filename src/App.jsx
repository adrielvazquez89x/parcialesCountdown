import './App.css'
import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import data from './data';
import logo from './logo.png';

function App() {
  const [parciales, setParciales] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nuevosParciales = parciales.filter((parcial) => {
        const fechaParcial = new Date(parcial.fecha);
        const tiempoTranscurrido = now - fechaParcial;
        const horasTranscurridas = tiempoTranscurrido / (1000 * 60 * 60); // Calcula las horas transcurridas

        // Filtra los parciales que tienen menos de 5 horas transcurridas
        return horasTranscurridas < 5;
      });
      setParciales(nuevosParciales);
    }, 1000);

    return () => clearInterval(interval);
  }, [parciales]);

  // Ordenar los parciales por fecha
  parciales.sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime();
    const fechaB = new Date(b.fecha).getTime();
    return fechaA - fechaB;
  });

  return (
    <div className='maxContainer'>
      <h1>Cuanto falta para el siguiente parcial o trabajo práctico crucial</h1>
      <div>
        <img src={logo} alt='' />
      </div>
      <p className='parrafito'>Tecnicatura Universitaria en Programación</p>

      {parciales.map((parcial) => (
        <Countdown key={parcial.id} {...parcial} />
      ))}
    </div>
  );
}

export default App;


