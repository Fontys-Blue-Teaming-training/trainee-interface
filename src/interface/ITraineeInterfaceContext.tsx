import { TeamHighScore } from "../model/TeamHighScore";

export default interface ITraineeInterfaceContext {
    highscores: TeamHighScore[];
    setHighscores: React.Dispatch<React.SetStateAction<TeamHighScore[]>>;
}