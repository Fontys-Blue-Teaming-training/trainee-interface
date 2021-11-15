export class Flag {
    id: number;
    description: string;
    points: number;

    constructor(id: number, description: string, points: number) {
        this.id = id;
        this.description = description;
        this.points = points;
    }
}