import { Button, Paper, TextField } from '@material-ui/core';
import { useContext, useState } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { FlagHttpClient } from '../../service/FlagHttpClient';
import './FlagsOverview.css';

const FlagsOverview = () => {
    const [flagInput, setFlagInput] = useState();
    const [alert, setAlert] = useState('');
    const { team, setTeam } = useContext(TraineeInterfaceContext);
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

        FlagClient.submitFlag(flag)
            .then((res: any) => {
                if (res['success']) {
                    console.log('success');
                    setAlert("");
                }
                else {
                    setAlert(res['message']);
                }
            })
    }

    return (
        <div className="flags-wrapper">
            <div className="flags">
                <h1 className="page-title">Flags</h1>
                <div className="alert">{alert}</div>
                <TextField onChange={(event) => changeFlagInput(event.target.value)} className="flag-input" id="standard-basic" label="Insert Flag" variant="standard" />
                <Button onClick={submitFlag} className="submit-flag">Submit</Button>
                <div className="flag">
                    <label className="checkmark-container">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <div className="flag-description">
                        Flag name
                    </div>
                </div>

            </div>
        </div>
    )
}
export default FlagsOverview;