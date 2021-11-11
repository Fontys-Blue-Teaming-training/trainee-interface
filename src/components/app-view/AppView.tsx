import { useContext } from 'react';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import FlagsOverview from '../flags-overview/FlagsOverview';
import Leaderboard from '../leaderboard/Leaderboard';
import Login from '../login/Login';
import Navbar from '../navbar/Navbar';
import './AppView.css';

const AppView = () => {
    const { highscores, setHighscores } = useContext(TraineeInterfaceContext);

    return (
        <div className="app-wrapper">
            <div className="nav-wrapper">
                <Navbar />
            </div>
            <div className="view-wrapper">
                <div className="dot">

                </div>
            </div>
        </div>
    )
}
export default AppView;