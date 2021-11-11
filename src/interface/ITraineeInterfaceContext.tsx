import { Team } from "../model/Team";
import { TeamHighScore } from "../model/TeamHighScore";

export default interface ITraineeInterfaceContext {
    highscores: TeamHighScore[];
    setHighscores: React.Dispatch<React.SetStateAction<TeamHighScore[]>>;
    team: Team;
    setTeam: React.Dispatch<React.SetStateAction<Team>>;
}