import { EventEmitter } from 'events';
import { ContextChannel } from './ContextChannel';
import { EventBus } from './EventBus';
import  Debug from 'debug';

var debug = Debug("channel");

export enum StateChannel {
    Process,
    Waiting,
}

export class Channel {
    
    private _name: string;
    private _state: StateChannel;
    private _limist_queue: number;
    private _queue: any[];
    private _bus: EventEmitter;
    private _callback: Function;
    private _context: ContextChannel;
    private _event_name: string;
    private _event_bus: EventBus;

    constructor(event_bus: EventBus, name: string,event_name: string, callback: Function, limit: number = 0) {
        this._event_bus = event_bus;
        this._event_name = event_name;
        this._name = name;
        this._callback = callback;
        this._limist_queue = limit;
        this._bus = new EventEmitter();
        this._queue = new Array();
        this._bus.on("next", this._next.bind(this));
        this._bus.on("handler", this.handler.bind(this));
        this._context = new ContextChannel(this);

        //
        this._state = StateChannel.Waiting;
    }

    public get name(): string {
        return this._name;
    }

    private handler(data: any) {
        this._state = StateChannel.Process;
        this._context.data = data;
        try {
            this._callback(this._context);
        } finally {
            this._state = StateChannel.Waiting;
        }
        this.callEventNext();
    }

    private callEventNext() {
        debug("call next event");
        this._bus.emit("next");
    }

    public listen() {
        this._event_bus.on(this._event_name, this._listen.bind(this));
    }

    public remove() {
        this._event_bus.off(this._event_name, this._listen.bind(this));
    }

    private _listen(data: any) {
        debug("listen new event channel");
        if(this._limist_queue != 0 && this._limist_queue >= this._queue.length) {
            return;
        }
        this._queue.push(data);
        this.callEventNext();
    }

    private _next() {
        debug("next process");
        if(this._state == StateChannel.Waiting) {
            debug("ext process StateChannel Waiting");
            if(this._queue.length > 0) {
                var data = this._queue.shift();
                this._bus.emit("handler", data)
            }
        }
    }
}