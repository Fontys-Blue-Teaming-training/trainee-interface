export class TeamHighScore {
  teamName: string;
  totalSeconds: number;
  points: number;
  timer: string = "00:00:00";

  constructor(teamName: string, totalSeconds: number, amountOfFlags: number) {
    this.teamName = teamName;
    this.totalSeconds = totalSeconds;
    this.points = amountOfFlags;
  }
}