import React, { useState, useEffect } from 'react';
import todotermino from './todotermino.jpg';

const Countdown = ({ materia, fecha, unidades, duracion }) => {
    const [parcial, setParcial] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const target = new Date(fecha);

        const interval = setInterval(() => {
            const now = new Date();
            const difference = target.getTime() - now.getTime();

            setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((difference % (1000 * 60)) / 1000));

            if (difference < 0) {
                setParcial(true);

                // Eliminar el elemento después de 24 horas (86400 segundos)
                setTimeout(() => {
                    setParcial(false);
                }, 86400000); // 24 horas en milisegundos
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {parcial ? (
                <div className='containerRED'>
                    <h2> EL PARCIAL DE {materia.toUpperCase()} ES HOY </h2>
                    <img src={todotermino} alt='' />
                </div>
            ) : (
                <div className='container'>
                    <h2>Parcial de {materia} </h2>
                    <h3>Fecha: {fecha} </h3>
                    <div className='containerClock'>
                        <div className='box'>
                            <p>{days}d</p>
                        </div>
                        <div className='box'>
                            <p>{hours}h</p>
                        </div>
                        <div className='box'>
                            <p>{minutes}m</p>
                        </div>
                        <div className='box'>
                            <p>{seconds}s</p>
                        </div>
                    </div>
                    <div className='content'>
                        <p>Temas: {unidades}</p>
                        <p>Duracion: {duracion}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Countdown;
