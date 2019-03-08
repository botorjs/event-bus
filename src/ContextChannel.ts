import { Channel } from "./Channel";


export class ContextChannel {
    public data: any;
    private _channel: Channel;

    constructor(channel: Channel) {
        this._channel = channel;
    }

    public get channel():Channel{
        return this._channel;
    }
}