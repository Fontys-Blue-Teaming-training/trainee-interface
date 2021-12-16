import { useContext, useEffect } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { TraineeInterfaceContext } from '../../context/TraineeInterfaceContext';
import WebSocketClient from '../../service/WebSocketClient';
import FlagsOverview from '../flags-overview/FlagsOverview';
import Guide from '../guide/Guide';
import Highscores from '../highscores/Highscores';
import Leaderboard from '../leaderboard/Leaderboard';
import Lobby from '../lobby/Lobby';
import Login from '../login/Login';
import Navbar from '../navbar/Navbar';
import './AppView.css';

const AppView = () => {
    const { started, setStarted } = useContext(TraineeInterfaceContext);
    const { setTeam } = useContext(TraineeInterfaceContext);

    useEffect(() => {
        try {
            let json = localStorage.getItem('start')
            const teamObj = localStorage.getItem('team');
            if (json) {
                setStarted(JSON.parse(json));
            }
            if (teamObj) {
                setTeam(JSON.parse(teamObj));
            }
        }
        catch (e) {
            console.error(e);
        }
    }, [])


    return (
        <div className="app-wrapper">
            <div className="nav-wrapper">
                <Navbar />
            </div>
            <div className="view-wrapper">
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/lobby' element={<Lobby />} />
                        <Route path='/highscores' element={<Highscores />} />
                        {
                            started ?
                                <>
                                    <Route path='/leaderboard' element={<Leaderboard />} />
                                    <Route path='/flags' element={<FlagsOverview />} />
                                    <Route path='/guide' element={<Guide />} />
                                </>
                                :
                                null
                        }

                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    )
}
export default AppView;