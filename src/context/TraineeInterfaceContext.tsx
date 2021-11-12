import { createContext, ReactNode, useState } from "react";
import ITraineeInterfaceContext from "../interface/ITraineeInterfaceContext";
import { LeaderBoardEntry } from "../model/LeaderboardEntry";
import { Team } from "../model/Team";
import { TeamHighScore } from "../model/TeamHighScore";

export const TraineeInterfaceContext = createContext({} as ITraineeInterfaceContext);

export const TraineeInterfaceProvider = (props: { children: ReactNode }) => {
    const [team, setTeam] = useState({} as Team);
    const [highscores, setHighscores] = useState([] as TeamHighScore[]);
    const [leaderboard, setLeaderboard] = useState([] as LeaderBoardEntry[]);

    const value = {
        highscores, setHighscores,
        team, setTeam,
        leaderboard, setLeaderboard
    }

    return (
        <TraineeInterfaceContext.Provider value={value}>
            {props.children}
        </TraineeInterfaceContext.Provider>
    )
}