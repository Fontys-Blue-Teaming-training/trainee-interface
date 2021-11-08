import { createContext, ReactNode, useState } from "react";
import ITraineeInterfaceContext from "../interface/ITraineeInterfaceContext";
import { TeamHighScore } from "../model/TeamHighScore";

export const TraineeInterfaceContext = createContext({} as ITraineeInterfaceContext);

export const TraineeInterfaceProvider = (props: { children: ReactNode }) => {
    const [highscores, setHighscores] = useState([] as TeamHighScore[]);

    const value = {
        highscores, setHighscores
    }

    return (
        <TraineeInterfaceContext.Provider value={value}>
            {props.children}
        </TraineeInterfaceContext.Provider>
    )
}