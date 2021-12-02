import { InfoMessageType } from "./InfoMessageType";

export class InfoMessage {
    infoType: InfoMessageType;
    message: string;

    constructor(infoType: InfoMessageType, message: string) {
        this.infoType = infoType;
        this.message = message;
    }

}