import { CurrentScenario } from "../model/CurrentScenario";
import { FlagCompleted } from "../model/FlagCompleted";
import { InfoMessage } from "../model/InfoMessage";
import { DisplayHint } from "../model/DisplayHint";
import { LeaderBoardEntry } from "../model/LeaderboardEntry";
import { Team } from "../model/Team";
import { TeamHighScore } from "../model/TeamHighScore";

export default interface ITraineeInterfaceContext {
    highscores: TeamHighScore[];
    setHighscores: React.Dispatch<React.SetStateAction<TeamHighScore[]>>;
    team: Team;
    setTeam: React.Dispatch<React.SetStateAction<Team>>;
    leaderboard: LeaderBoardEntry[];
    setLeaderboard: React.Dispatch<React.SetStateAction<LeaderBoardEntry[]>>;
    leaderboardData: LeaderBoardEntry[];
    setLeaderboardData: React.Dispatch<React.SetStateAction<LeaderBoardEntry[]>>;
    flags: FlagCompleted[];
    setFlags: React.Dispatch<React.SetStateAction<FlagCompleted[]>>;
    timer: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;
    currentScenario: CurrentScenario;
    setCurrentScenario: React.Dispatch<React.SetStateAction<CurrentScenario>>;
    completeFlag: boolean;
    setCompleteFlag: React.Dispatch<React.SetStateAction<boolean>>;
    flagCompletedUpdate: boolean;
    setFlagCompletedUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    started: boolean;
    setStarted: React.Dispatch<React.SetStateAction<boolean>>;
    hint: DisplayHint;
    setHint: React.Dispatch<React.SetStateAction<DisplayHint>>;
}