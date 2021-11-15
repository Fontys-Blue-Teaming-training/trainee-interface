import { Flag } from "../model/Flag";
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
    flags: Flag[];
    setFlags: React.Dispatch<React.SetStateAction<Flag[]>>;
    timer: Date;
    setTimer: React.Dispatch<React.SetStateAction<Date>>;
}