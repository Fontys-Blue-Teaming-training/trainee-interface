import { useContext, useEffect, useState } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { ScenarioHttpClient } from '../../service/ScenarioHttpClient';
import './Timer.css';


const Timer = () => {
    const { timer, setTimer, team, setTeam, currentScenario, setCurrentScenario } = useContext(TraineeInterfaceContext);
    const [alert, setAlert] = useState('');
    const [clock, setClock] = useState('');
    const [intervalBool, setIntervalBool] = useState(false);
    const [startDate, setStartDate] = useState(new Date);
    const scenarioHttpClient = new ScenarioHttpClient();

    const formatTime = () => {
        const totalSeconds = (new Date().getTime() - startDate.getTime()) / 1000;
        const getHours = `0${Math.floor(totalSeconds / 3600)}`.slice(-2);
        let remainingSeconds = totalSeconds % 3600;
        const getMinutes = `0${Math.floor(remainingSeconds / 60)}`.slice(-2);
        remainingSeconds = remainingSeconds % 60;
        const getSeconds = `0${Math.floor(remainingSeconds)}`.slice(-2);
        setTimer(totalSeconds);
        setIntervalBool(!intervalBool);

        return `${getHours}:${getMinutes}:${getSeconds}`
    }

    useEffect(() => {
        let team;
        try {
            const teamObj = localStorage.getItem('team');
            if (teamObj) {
                team = JSON.parse(teamObj);
            }
        }
        catch (e) {
            console.log(e);
        }

        if (team) {
            scenarioHttpClient.getCurrent(team.id)
                .then((res: any) => {
                    if (res['success']) {
                        const scenario = res['message'];
                        const start = res['message']['startTime'];
                        setStartDate(new Date(start));
                        setCurrentScenario(scenario);
                        localStorage.setItem('currentScenario', JSON.stringify(currentScenario));
                    }
                    else {
                        setAlert(res['message'])
                    }
                })
        }
    }, [])


    //TODO: setInterval
    useEffect(() => {
        setTimeout(() => setClock(formatTime()), 1000);
    }, [intervalBool]);

    return (
        <div className="timer">
            <div className="alert small-text">
                {alert}
            </div>
            {
                clock && alert === '' ? <div>{clock}</div> : null
            }
        </div>
    )
}

export default Timer;