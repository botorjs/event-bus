import { expect } from "chai";
import { EventBus } from "../src/EventBus";


var bus: EventBus = null;

describe('EventBus test', function() {

    before(function () {
        bus = new EventBus();
    })

    after(function(){
        bus = null;
    })

    it('listen event', function() {
        bus.on("test", function(data) {
            expect(data).to.eql("test");
        })
        bus.emit("test", "test");
    });  
    
    it('listen event one', function() {
        bus.once("test_1", function(data) {
            expect(data).to.eql("test");
        })
        bus.emit("test_1", "test");
    });

    it('remove event one', function() {
        var callback =  function() {
            expect(true).to.eql(false);
        }
        bus.on("test_2", callback);
        bus.off("test_2", callback);
        bus.emit("test_2", "test");
    });

});