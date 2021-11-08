import { Button, Paper, TextField } from '@material-ui/core';
import './Login.css';

const Login = () => {
    return (
        <div className="login-wrapper">
            <div className="login-form">
                <div>
                    <h1>Log In</h1>
                    <TextField className="team-name-input" id="standard-basic" label="Team Name" variant="standard" />
                    <Button className="submit-team-name">Submit</Button>
                </div>
            </div>
        </div>
    )
}
export default Login;