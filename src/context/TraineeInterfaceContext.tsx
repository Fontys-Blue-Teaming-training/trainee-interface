import { createContext, ReactNode, useState } from "react";
import ITraineeInterfaceContext from "../interface/ITraineeInterfaceContext";
import { Team } from "../model/Team";
import { TeamHighScore } from "../model/TeamHighScore";

export const TraineeInterfaceContext = createContext({} as ITraineeInterfaceContext);

export const TraineeInterfaceProvider = (props: { children: ReactNode }) => {
    const [team, setTeam] = useState({} as Team);
    const [highscores, setHighscores] = useState([] as TeamHighScore[]);

    const value = {
        highscores, setHighscores,
        team, setTeam
    }

    return (
        <TraineeInterfaceContext.Provider value={value}>
            {props.children}
        </TraineeInterfaceContext.Provider>
    )
}