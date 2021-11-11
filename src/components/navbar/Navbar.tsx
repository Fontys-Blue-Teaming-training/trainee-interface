import { Button } from '@material-ui/core';
import './Navbar.css';

const Navbar = () => {

    return (
        <div className="navbar">
            <div className="logo">
                <div className="logo-img">

                </div>
            </div>
            <div className="navbar-buttons">
                <Button href="/login" className="nav-button">Login</Button>
                <Button href="/leaderboard" className="nav-button">Leaderboard</Button>
                <Button href="/highscores" className="nav-button">Highscores</Button>
                <Button href="/flags" className="nav-button">Flags</Button>
                <Button href="/guide" className="nav-button">Guide</Button>
            </div>
        </div>
    )
}

export default Navbar;