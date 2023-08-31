import React, { useState, useEffect } from 'react'

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
            setMinutes(Math.floor((difference % (1000 * 60 * 60) / (1000 * 60))));
            setSeconds(Math.floor((difference % (1000 * 60)) / 1000));

            if (difference <= 0) {
                setParcial(true);
            }

        }, 1000)



        return () => clearInterval(interval)
    }, [])


    return (
        <>
            {parcial ?
                (
                    <p> El parcial de {materia} es hoy </p >
                )
                :
                (
                    <div className='container'>
                        <h2>Parcial de {materia} </h2>
                        <div className='containerClock'>
                            <div className='box'>
                                <p>
                                    {days}d
                                </p>
                            </div>
                            <div className='box'>
                                <p>
                                    {hours}h
                                </p>
                            </div>
                            <div className='box'>
                                <p>
                                    {minutes}m
                                </p>
                            </div>
                            <div className='box'>
                                <p>
                                    {seconds}s
                                </p>
                            </div>
                        </div>
                        <div className='content'>
                            <p>Temas: {unidades}</p>
                            <p>Duracion: {duracion}</p>
                        </div>
                    </div>

                )
            }
        </>




    )
}

export default Countdown