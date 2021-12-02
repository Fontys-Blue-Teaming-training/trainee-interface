import { createContext, ReactNode, useState } from "react";
import ITraineeInterfaceContext from "../interface/ITraineeInterfaceContext";
import { CurrentScenario } from "../model/CurrentScenario";
import { FlagCompleted } from "../model/FlagCompleted";
import { DisplayHint } from "../model/DisplayHint";
import { LeaderBoardEntry } from "../model/LeaderboardEntry";
import { Team } from "../model/Team";
import { TeamHighScore } from "../model/TeamHighScore";

export const TraineeInterfaceContext = createContext({} as ITraineeInterfaceContext);

export const TraineeInterfaceProvider = (props: { children: ReactNode }) => {
    const [team, setTeam] = useState({} as Team);
    const [highscores, setHighscores] = useState([] as TeamHighScore[]);
    const [currentScenario, setCurrentScenario] = useState({} as CurrentScenario);
    const [leaderboard, setLeaderboard] = useState([] as LeaderBoardEntry[]);
    const [leaderboardData, setLeaderboardData] = useState([] as LeaderBoardEntry[]);
    const [flags, setFlags] = useState([] as FlagCompleted[]);
    const [timer, setTimer] = useState(0);
    // hint useState
    const [hint, setHint] = useState({} as DisplayHint);

    const value = {
        highscores, setHighscores,
        team, setTeam,
        leaderboard, setLeaderboard,
        flags, setFlags,
        leaderboardData, setLeaderboardData,
        timer, setTimer,
        currentScenario, setCurrentScenario,
        hint, setHint,
    }

    return (
        <TraineeInterfaceContext.Provider value={value}>
            {props.children}
        </TraineeInterfaceContext.Provider>
    )
}