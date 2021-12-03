import { CurrentScenario } from "../model/CurrentScenario";
import { FlagCompleted } from "../model/FlagCompleted";
<<<<<<< HEAD
import { InfoMessage } from "../model/InfoMessage";
=======
import { DisplayHint } from "../model/DisplayHint";
>>>>>>> fa0949141d1a2aba642228cb61432dcc10ba7509
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
<<<<<<< HEAD
    completeFlag: boolean;
    setCompleteFlag: React.Dispatch<React.SetStateAction<boolean>>;
    flagCompletedUpdate: boolean;
    setFlagCompletedUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    started: boolean;
    setStarted: React.Dispatch<React.SetStateAction<boolean>>;
=======
    hint: DisplayHint;
    setHint: React.Dispatch<React.SetStateAction<DisplayHint>>;
>>>>>>> fa0949141d1a2aba642228cb61432dcc10ba7509
}