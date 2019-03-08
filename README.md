# Event Bus
[![Build Status](https://travis-ci.org/botorjs/event-bus.svg?branch=master)](https://travis-ci.org/botorjs/event-bus)
[![Coverage Status](https://coveralls.io/repos/github/botorjs/event-bus/badge.svg?branch=master)](https://coveralls.io/github/botorjs/event-bus?branch=master)

### Library that core of Botorjs is a event bus

# Installation
```
npm install @botorjs/event-bus --save
```

# Setup and Example


```js

    import { EventBus } from "../src/EventBus";
    var bus: EventBus = new EventBus();

    // 
    bus.on("test", function(data) {
       // process
    })
    bus.emit("test", "test");

    // channel point-to-point
    bus.registerChannel("test", "test", (data: ContextChannel) => {
        // process
    });
    bus.emit("test","t");
    bus.emit("test","t");
    bus.emit("test","t");
```

# API

## EventBus

| Property   |      Description      |
|---------- |:-------------|
| on(name, callback)  |  listen event | 
| once(name, callback) |    listen event one time  | 
| off(name, callback) | remove listen event | 
| registerChannel(name, event_name, callback, limit = 0) |  register a channel with callback handle |
| getChannel(name)  |  get channel have register | 
| removeChannel(name)  |  remove channel have register | 


## ContextChannel
* data connext of Channel

| Property   |      Description      |
|---------- |:-------------|
| data  |  get value data | 
| channel |   set channel event  | 

## Channel

| Property   |      Description      |
|---------- |:-------------|
| name  |  name channel |
| listen |   listen event  |
| remove |   remove listen event  |
