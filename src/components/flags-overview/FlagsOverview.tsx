import { Paper } from '@material-ui/core';
import './FlagsOverview.css';

const FlagsOverview = () => {
    return (
        <div className="flags-wrapper">

            <div className="flags">
                <h1 className="page-title">Flags</h1>
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