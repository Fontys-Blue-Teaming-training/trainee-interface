import { Button, Paper, TextField } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { Flag } from '../../model/Flag';
import { FlagHttpClient } from '../../service/FlagHttpClient';
import './FlagsOverview.css';

const FlagsOverview = () => {
    const [flagInput, setFlagInput] = useState();
    const [alert, setAlert] = useState('');
    const [submitPressed, setSubmitPressed] = useState(true);
    const { flags, setFlags } = useContext(TraineeInterfaceContext);
    const FlagClient = new FlagHttpClient();

    const changeFlagInput = (event: any) => {
        setFlagInput(event)
    }

    const submitFlag = () => {
        const team = localStorage.getItem('team');
        let id;

        if (team) {
            id = JSON.parse(team);
        }

        const flag = {
            "teamId": id['id'],
            "flagCode": flagInput
        }
        setSubmitPressed(true);
        FlagClient.submitFlag(flag)
            .then((res: any) => {
                if (res['success']) {
                    let array: any[];
                    array = res['message'];
                }
                else {
                    setAlert(res['message']);
                }
            })
    }

    useEffect(() => {
        if (submitPressed) {
            FlagClient.getFlags(1)
                .then((res: any) => {
                    if (res['success']) {
                        let array: Flag[];
                        array = res['message'];
                        setFlags(array);
                        //Add functionality to check input on completed flags
                    }
                    else {
                        setAlert(res['message']);
                    }
                })
            setSubmitPressed(false);
        }
    })

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
                        flags.map((flag) => {
                            return (
                                <div className="flag">
                                    <label className="checkmark-container">
                                        <input id={flag.id.toString()} type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <div className="flag-description">
                                        {flag.description}
                                    </div>
                                    <div className="flag-points">
                                        {flag.points}
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