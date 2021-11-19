import { Flag } from "./Flag";

export class FlagCompleted {
    flag: Flag;
    isCompleted: boolean;

    constructor(flag: Flag, completed: boolean) {
        this.flag = flag;
        this.isCompleted = completed;
    }
}