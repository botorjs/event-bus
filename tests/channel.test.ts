import { expect } from "chai";
import { EventBus } from "../src/EventBus";
import { ContextChannel } from "../src/ContextChannel";


var bus: EventBus = null;

describe('Channel test', function() {

    before(function () {
        bus = new EventBus();
    })

    after(function(){
        bus = null;
    })

    it('register', function() {
        bus.registerChannel("test", "test", (data: ContextChannel) => {
            expect(data.channel.name).to.eql("test");
        });
        var channel = bus.getChannel("test");
        expect(channel.name).to.eql("test");
        bus.emit("test","t");
        bus.emit("test","t");
        bus.emit("test","t");
    });  

    it('remove channel', function() {
        var channel = bus.getChannel("test");
        bus.removeChannel(channel);
        channel = bus.getChannel("test");
        expect(channel).to.eql(undefined);
    });  

});