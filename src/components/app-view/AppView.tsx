import Navbar from '../navbar/Navbar';
import './AppView.css';

const AppView = () => {
    return (
        <div className="app-wrapper">
            <div className="nav-wrapper">
                <Navbar />
            </div>
            <div className="view-wrapper">
                Test
            </div>
        </div>
    )
}
export default AppView;