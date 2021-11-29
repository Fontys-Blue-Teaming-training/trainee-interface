import { Route, BrowserRouter, Routes } from 'react-router-dom';
import FlagsOverview from '../flags-overview/FlagsOverview';
import Guide from '../guide/Guide';
import Highscores from '../highscores/Highscores';
import Leaderboard from '../leaderboard/Leaderboard';
import Lobby from '../lobby/Lobby';
import Login from '../login/Login';
import Navbar from '../navbar/Navbar';
import './AppView.css';

const AppView = () => {
    return (
        <div className="app-wrapper">
            <div className="nav-wrapper">
                <Navbar />
            </div>
            <div className="view-wrapper">
                <BrowserRouter>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/lobby' element={<Lobby />} />
                        <Route path='/leaderboard' element={<Leaderboard />} />
                        <Route path='/highscores' element={<Highscores />} />
                        <Route path='/flags' element={<FlagsOverview />} />
                        <Route path='/guide' element={<Guide />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}
export default AppView;