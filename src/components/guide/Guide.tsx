import './Guide.css';
import { Button, TextField } from '@material-ui/core';
import { GuideHttpClient } from '../../service/GuideHttpClient';
import { FlagHttpClient } from '../../service/FlagHttpClient';
import { FlagCompleted } from '../../model/FlagCompleted';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { useContext, useEffect, useState } from 'react';
import { DisplayHint } from "../../model/DisplayHint";


const Guide = () => {
    const [teamId, setTeamId] = useState(0);
    const [flagId, setFlagId] = useState(0);
    const [alert, setAlert] = useState('');
    const { hint, setHint } = useContext(TraineeInterfaceContext);
    const { flags, setFlags } = useContext(TraineeInterfaceContext);
    const guideHttpClient = new GuideHttpClient();
    const FlagClient = new FlagHttpClient();

    const getCurrentHint = (id: number) => {
        //setIds(id);
        let teamObj;
        try {
            const team = localStorage.getItem('team');

            if (team) {
                teamObj = JSON.parse(team);

            }
        }
        catch (e) {
            console.error(e);
        }
        if (teamObj['id'] !== 0 && id !== 0) {
            guideHttpClient.getFlagHint(teamObj['id'], id)
                .then((res: any) => {
                    if (res['success']) {
                        const hint = new DisplayHint(res['message']['hintText'], "");
                        setHint(hint);
                        //localStorage.setItem('hint', JSON.stringify(hint));
                    }
                    else {
                        setAlert(res['message']);
                    }
                })
        }

        else {
            setAlert('Please fill in a team name before logging in');
        }
    }
    const setIds = (id: number) => {
        let teamObj;
        try {
            const team = localStorage.getItem('team');

            if (team) {
                teamObj = JSON.parse(team);

            }
        }
        catch (e) {
            console.error(e);
        }
        setTeamId(teamObj['id']);
        setFlagId(id);
    }

    useEffect(() => {
        let teamObj;
        try {
            const team = localStorage.getItem('team');

            if (team) {
                teamObj = JSON.parse(team);
            }
        }
        catch (e) {
            console.error(e);
        }
        FlagClient.getFlags(teamObj['id'])
            .then((res: any) => {
                if (res['success']) {
                    let array: FlagCompleted[];
                    array = res['message'];
                    setFlags(array);

                }
                else {
                    setAlert(res['message']);
                }
            })
    }, [])

    // Get current scenario id and increment number
    // Display scenerio and add time to the team
    // Check if the hint is seen -> Add a record that the team have seen the hint and add time penalty 


    return (
        <div className="wrapper">
            <div className="title">
                <h1>Guide</h1>
            </div>
            <div className="body">
                <div className="body-flex flags">
                    <div className="alert">{alert}</div>
                    <div className="body-flex width">
                        {
                            flags.map((item) => {
                                return (
                                    <div className="flag">
                                        <div className="flag-description">
                                            {item.flag.description}
                                        </div>
                                        <div className="flag-points">
                                            {item.flag.points}
                                        </div>
                                        <label className="checkmark-container">
                                            <Button onClick={(e) => getCurrentHint(item.flag.id)} variant="outlined">Outlined</Button>
                                        </label>
                                    </div>
                                )
                            })
                        }
                        <div>
                            <p>{hint.hintText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guide;