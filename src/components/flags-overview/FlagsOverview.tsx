import { Button, TextField } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { FlagCompleted } from '../../model/FlagCompleted';
import { FlagHttpClient } from '../../service/FlagHttpClient';
import './FlagsOverview.css';

const FlagsOverview = () => {
    const [flagInput, setFlagInput] = useState();
    const [alert, setAlert] = useState('');
    const { flags, setFlags } = useContext(TraineeInterfaceContext);
    const FlagClient = new FlagHttpClient();

    const changeFlagInput = (event: any) => {
        setFlagInput(event)
    }

    const submitFlag = () => {
        let teamObj;
        try {
            const team = localStorage.getItem('team');
            if (team) {
                teamObj = JSON.parse(team);
            }
        }
        catch (e) {
            console.log(e);
        }
        const flag = {
            "teamId": teamObj['id'],
            "flagCode": flagInput
        }
        FlagClient.submitFlag(flag)
            .then((res: any) => {
                if (res['success']) {
                    let array: FlagCompleted[];
                    array = res['message'];
                    window.location.reload();
                }
                else {
                    setAlert(res['message']);
                }
            })
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
            console.log(e);
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

    return (
        <div className="wrapper">
            <div className="title">
                <h1>Flags</h1>
            </div>
            <div className="body">
                <div className="body-flex flags">
                    <div className="alert">{alert}</div>
                    <TextField onChange={(event) => changeFlagInput(event.target.value)} className="flag-input" id="standard-basic" label="Insert Flag" variant="standard" />
                    <Button onClick={submitFlag} className="submit-flag">Submit</Button>
                    {
                        flags.map((item) => {
                            return (
                                <div className="flag">
                                    <label className="checkmark-container">
                                        <input id={item.flag.id.toString()} type="checkbox" checked={item.isCompleted} />
                                        <span className="checkmark"></span>
                                    </label>
                                    <div className="flag-description">
                                        {item.flag.description}
                                    </div>
                                    <div className="flag-points">
                                        {item.flag.points}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default FlagsOverview;