import { InfoMessageType } from "./InfoMessageType";

export class InfoMessage {
    type: InfoMessageType;
    message: string;

    constructor(type: InfoMessageType, message: string) {
        this.type = type;
        this.message = message;
    }

}