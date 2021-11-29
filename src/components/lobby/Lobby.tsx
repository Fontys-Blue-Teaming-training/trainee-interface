import './Lobby.css';

const Lobby = () => {

    return (
        <div className="wrapper">
            <div className="title">
                <h1>Waiting for start...</h1>
            </div>
            <div className="body">
                <div className="body-flex">
                    Please wait for the scenario to start. You will be redirected automatically.
                </div>
            </div>
        </div>
    )
}

export default Lobby;