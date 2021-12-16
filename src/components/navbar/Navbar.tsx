import { Button } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import './Navbar.css';

const Navbar = () => {
    const { team, setTeam } = useContext(TraineeInterfaceContext);
    const { started, setStarted } = useContext(TraineeInterfaceContext);

    const logOut = () => {
        localStorage.removeItem('start');
        localStorage.removeItem('team');
        window.location.href = 'http://192.168.1.7/';
    }

    return (
        <div className="navbar">
            <div className="logo">
                <div className="logo-img">

                </div>
            </div>
            <div className="navbar-buttons">
                {
                    !team.id ? <Button href="/" className="nav-button">Login</Button> : null
                }
                <Button href="/highscores" className="nav-button">Highscores</Button>
                {
                    team.id && started ?
                        <>
                            <Button href="/leaderboard" className="nav-button">Leaderboard</Button>
                            <Button href="/flags" className="nav-button">Flags</Button>
                            <Button href="/guide" className="nav-button">Guide</Button>
                            <Button onClick={logOut} className="nav-button">Log Out</Button>
                        </>
                        :
                        null
                }

            </div>
        </div>
    )
}

export default Navbar;