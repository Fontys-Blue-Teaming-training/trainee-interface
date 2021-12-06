import { useState, useCallback, useContext, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { apiConfig } from '../config/ApiConfig';
import { TraineeInterfaceContext } from '../context/TraineeInterfaceContext';
import { InfoMessage } from '../model/InfoMessage';
import { InfoMessageType } from '../model/InfoMessageType';


export const WebSocketClient = () => {
    //Public API that will echo messages sent to it back to the client
    const [socketUrl, setSocketUrl] = useState(apiConfig.websocketUrl);
    const { completeFlag, setCompleteFlag, flagCompletedUpdate, setFlagCompletedUpdate, team } = useContext(TraineeInterfaceContext);

    const {
        sendMessage,
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);

    const connect = useCallback(() => {
        setSocketUrl(apiConfig.websocketUrl);

    }, []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        if (lastMessage) {
            try {
                const json = JSON.parse(lastMessage['data']);
                const infoMessage = new InfoMessage(json['Type'], json['Message']);
                switch (infoMessage.message) {
                    case "SCENARIO STARTED":
                        localStorage.setItem('start', "true");
                        window.location.href = 'http://192.168.1.21/flags';
                        break;
                    case "FLAG COMPLETED":
                        setFlagCompletedUpdate(!flagCompletedUpdate)
                        break;
                    case "SCENARIO STOPPED":
                        localStorage.removeItem('start');
                        localStorage.removeItem('team');
                        window.location.href = 'http://192.168.1.21/';
                        break;
                }
            }
            catch (error) {
                console.log(error);
            }

        }
    }, [lastMessage])

    useEffect(() => {
        if (completeFlag) {
            const message = new InfoMessage(InfoMessageType.FLAG_COMPLETED, "FLAG COMPLETED");
            sendMessage(JSON.stringify(message));
        }
        setCompleteFlag(false);
    }, [completeFlag])

    useEffect(() => {
        if (team.id === undefined) {
            const message = new InfoMessage(InfoMessageType.TEAM_CREATED, team.name);
            sendMessage(JSON.stringify(message));
        }
    }, [team])

    useEffect(() => {
        const status = connectionStatus;
        const interval = setInterval(() => {
            if (status === 'Closed' || status === 'Closing' || status === 'Uninstantiated') {
                connect();
            }
            console.log('Connection status changed:', status);
        }, 1000)
        return () => clearInterval(interval);
    }, [])



    return (
        null
    );
};

export default WebSocketClient;