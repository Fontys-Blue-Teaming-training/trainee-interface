export class TeamHighScore {
  teamName: string;
  points: number;
  amountOfFlags: number;

  constructor(teamName: string, points: number, amountOfFlags: number) {
    this.teamName = teamName;
    this.points = points;
    this.amountOfFlags = amountOfFlags;
  }
}