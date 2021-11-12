export class LeaderBoardEntry {
    flagId: number;
    teamId: number;
    teamName: string;
    points: number;
    completeDate: Date;

    constructor(flagId: number, teamId: number, teamName: string, points: number, completeDate: Date) {
        this.flagId = flagId;
        this.teamId = teamId;
        this.teamName = teamName;
        this.points = points;
        this.completeDate = completeDate;
    }
}