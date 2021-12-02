import { Button, TextField } from '@material-ui/core';
import { useContext, useState } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import { Team } from '../../model/Team';
import { TeamHttpClient } from '../../service/TeamHttpClient';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const { setTeam } = useContext(TraineeInterfaceContext);
    const [teamName, setTeamName] = useState('');
    const [alert, setAlert] = useState('');
    const teamClient = new TeamHttpClient();
    let navigate = useNavigate();

    const login = () => {
        if (teamName !== '') {
            const jsonBody = {
                "name": teamName
            }
            teamClient.Login(jsonBody)
                .then((res: any) => {
                    if (res['success']) {
                        const team = new Team(res['message']['id'], res['message']['name']);
                        setTeam(team);
                        localStorage.setItem('team', JSON.stringify(team));
                        navigate('../lobby');
                    }
                    else {
                        setAlert(res['message']);
                    }
                })
        }
        else {
            setAlert('Please fill in a team name before logging in')
        }
    }

    const changeTeamName = (event: string) => {
        setTeamName(event);
    }

    return (
        <div className="wrapper">
            <div className="title">
                <h1>Log In</h1>
            </div>
            <div className="body">
                <div className="body-flex">
                    <div>
                        <div className="alert">{alert}</div>
                        <TextField onChange={(event) => changeTeamName(event.target.value)} className="team-name-input" id="standard-basic" label="Team Name" variant="standard" />
                        <Button onClick={login} className="submit-team-name">Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;