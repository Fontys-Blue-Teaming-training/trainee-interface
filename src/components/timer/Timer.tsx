import { useContext, useEffect, useState } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import './Timer.css';

const Timer = () => {
    const { timer, setTimer } = useContext(TraineeInterfaceContext);
    const [clock, setClock] = useState('');

    const formatTime = () => {
        const totalSeconds = (new Date().getTime() - timer.getTime()) / 1000;
        const getHours = `0${Math.floor(totalSeconds / 3600)}`.slice(-2);
        let remainingSeconds = totalSeconds % 3600;
        const getMinutes = `0${Math.floor(remainingSeconds / 60)}`.slice(-2);
        remainingSeconds = remainingSeconds % 60;
        const getSeconds = `0${Math.floor(remainingSeconds)}`.slice(-2);

        return `${getHours}:${getMinutes}:${getSeconds}`
    }

    useEffect(() => {
        setTimeout(() => setClock(formatTime()), 1000);
    });

    return (
        <div className="timer">
            {
                timer ? <div>{clock}</div> : <div>00:00:00</div>
            }
        </div>
    )
}

export default Timer;