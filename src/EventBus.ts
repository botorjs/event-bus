import  { EventEmitter } from 'events'
import { Channel } from './Channel';

export class EventBus {
    private _event_bus: EventEmitter
    private _channel: Map<string, Channel>;

    constructor() {
        this._event_bus = new EventEmitter();
        this._channel = new Map<string, Channel>();
    }

    /**
     *  listen event name
     * 
     * @param name name
     * @param callback callback when listen event name
     */
    public on(name: string, callback: (...args: any[]) => void) {
        this._event_bus.on(name, callback);
    }

    /**
     *  fire event
     * 
     * @param name event name
     * @param data data event
     */
    public emit(name: string, data: any = null) {
        this._event_bus.emit(name, data);
    }

     /**
     *  remove event
     * 
     * @param name event name
     * @param data data event
     */
    public off(name: string, callback: (...args: any[]) => void) {
        this._event_bus.off(name, callback);
    }


    public once(name: string,  callback: (...args: any[]) => void) {
        this._event_bus.once(name, callback);
    }


    public registerChannel(name:string, event_name: string, callback: Function, limit: number = 0) {
        const channel = new Channel(this, name, event_name, callback, limit);
        this._channel.set(name, channel);
        channel.listen();
    }

    public removeChannel(channel: Channel) {
        channel.remove();
        this._channel.delete(channel.name);
    }

    public getChannel(name): Channel {
        return this._channel.get(name);
    }
}