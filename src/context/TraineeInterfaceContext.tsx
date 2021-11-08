import { createContext, ReactNode, useState } from "react";
import ITraineeInterfaceContext from "../interface/ITraineeInterfaceContext";

export const TraineeInterfaceContext = createContext({} as ITraineeInterfaceContext);

export const TraineeInterfaceProvider = (props: { children: ReactNode }) => {
    const [highscores, setHighscores] = useState([] as any[]);

    const value = {
        highscores, setHighscores
    }

    return (
        <TraineeInterfaceContext.Provider value={value}>
            {props.children}
        </TraineeInterfaceContext.Provider>
    )
}