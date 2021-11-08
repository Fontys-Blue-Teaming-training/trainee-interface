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
                <Button className="nav-button">Test</Button>
                <Button className="nav-button">Test</Button>
                <Button className="nav-button">Test</Button>
                <Button className="nav-button">Test</Button>
                <Button className="nav-button">Test</Button>
                <Button className="nav-button">Test</Button>
            </div>
        </div>
    )
}

export default Navbar;