import './App.css'
import { useState, useEffect } from 'react';
import Countdown from './Countdown';
import logo from './logo.png';

function App() {
  const [parciales, setParciales] = useState(() => {
    const saved = localStorage.getItem('parciales');
    return saved ? JSON.parse(saved) : [];
  });
  const [newParcial, setNewParcial] = useState({
    materia: '',
    unidades: '',
    fecha: '',
    duracion: ''
  });

  // Cargar y guardar en localStorage
  useEffect(() => {
    localStorage.setItem('parciales', JSON.stringify(parciales));
  }, [parciales]);

  // Filtrado de parciales
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const nuevosParciales = parciales.filter((parcial) => {
        const fechaParcial = new Date(parcial.fecha);
        const tiempoTranscurrido = now - fechaParcial;
        const horasTranscurridas = tiempoTranscurrido / (1000 * 60 * 60);
        return horasTranscurridas < 5;
      });
      setParciales(nuevosParciales);
    }, 1000);

    return () => clearInterval(interval);
  }, [parciales]);

  const handleInputChange = (e) => {
    setNewParcial({
      ...newParcial,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoParcial = {
      ...newParcial,
      id: Date.now()
    };
    setParciales([...parciales, nuevoParcial]);
    setNewParcial({
      materia: '',
      unidades: '',
      fecha: '',
      duracion: ''
    });
  };

  // Ordenar los parciales por fecha
  const sortedParciales = [...parciales].sort((a, b) => {
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

      <form onSubmit={handleSubmit} className='form-container'>
        <h2 style={{ marginTop: 0 }}>Agregar nuevo parcial</h2>
        <div className='form-group'>
          <label>Materia:</label>
          <input
            type="text"
            name="materia"
            value={newParcial.materia}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Unidades:</label>
          <input
            type="text"
            name="unidades"
            value={newParcial.unidades}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Fecha y hora:</label>
          <input
            type="datetime-local"
            name="fecha"
            value={newParcial.fecha}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>Duración:</label>
          <input
            type="text"
            name="duracion"
            value={newParcial.duracion}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className='submit-button'>Agregar Parcial</button>
      </form>

      <div className='parciales-list'>
        {sortedParciales.map((parcial) => (
          <Countdown key={parcial.id} {...parcial} />
        ))}
      </div>
    </div>
  );
}

export default App;