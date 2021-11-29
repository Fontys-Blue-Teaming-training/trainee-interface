import { CurrentScenario } from "../model/CurrentScenario";
import { FlagCompleted } from "../model/FlagCompleted";
import { Hint } from "../model/Hint";
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
    hint: Hint;
    setHint: React.Dispatch<React.SetStateAction<Hint>>;
}