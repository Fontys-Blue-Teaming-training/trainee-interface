import { createContext, ReactNode, useState } from "react";
import ITraineeInterfaceContext from "../interface/ITraineeInterfaceContext";
import { Flag } from "../model/Flag";
import { LeaderBoardEntry } from "../model/LeaderboardEntry";
import { Team } from "../model/Team";
import { TeamHighScore } from "../model/TeamHighScore";

export const TraineeInterfaceContext = createContext({} as ITraineeInterfaceContext);

export const TraineeInterfaceProvider = (props: { children: ReactNode }) => {
    const [team, setTeam] = useState({} as Team);
    const [highscores, setHighscores] = useState([] as TeamHighScore[]);
    const [leaderboard, setLeaderboard] = useState([] as LeaderBoardEntry[]);
    const [leaderboardData, setLeaderboardData] = useState([] as LeaderBoardEntry[]);
    const [flags, setFlags] = useState([] as Flag[]);
    const [timer, setTimer] = useState(new Date);

    const value = {
        highscores, setHighscores,
        team, setTeam,
        leaderboard, setLeaderboard,
        flags, setFlags,
        leaderboardData, setLeaderboardData,
        timer, setTimer
    }

    return (
        <TraineeInterfaceContext.Provider value={value}>
            {props.children}
        </TraineeInterfaceContext.Provider>
    )
}