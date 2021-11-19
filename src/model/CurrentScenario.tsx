import { Scenario } from "./Scenario";

export class CurrentScenario {
    id: number;
    scenario: Scenario;
    startTime: Date;
    endTime: Date;

    constructor(id: number, scenario: Scenario, startTime: Date, endTime: Date) {
        this.id = id;
        this.scenario = scenario;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}