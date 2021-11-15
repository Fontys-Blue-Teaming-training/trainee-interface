export class LeaderBoardEntry {
    flagId: number;
    teamId: number;
    teamName: string;
    points: number;
    totalSeconds: number;

    constructor(flagId: number, teamId: number, teamName: string, points: number, totalSeconds: number) {
        this.flagId = flagId;
        this.teamId = teamId;
        this.teamName = teamName;
        this.points = points;
        this.totalSeconds = totalSeconds;
    }
}