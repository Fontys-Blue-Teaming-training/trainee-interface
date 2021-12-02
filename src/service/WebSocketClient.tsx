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
        sendMessage('connect');
    }, []);

    useEffect(() => {
        if (lastMessage) {
            try {
                const json = JSON.parse(lastMessage['data']);
                const infoMessage = new InfoMessage(json['Type'], json['Message']);
                switch (infoMessage.message) {
                    case "SCENARIO STARTED":
                        localStorage.setItem('start', "true");
                        console.log('scenario start');
                        break;
                    case "FLAG COMPLETED":
                        console.log('flag complete');
                        setFlagCompletedUpdate(!flagCompletedUpdate)
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
            const message = new InfoMessage(InfoMessageType.INFO, "FLAG COMPLETED");
            sendMessage(JSON.stringify(message));
        }
        setCompleteFlag(false);
    }, [completeFlag])

    useEffect(() => {
        sendMessage(JSON.stringify(team));
    }, [team])


    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        null
    );
};

export default WebSocketClient;