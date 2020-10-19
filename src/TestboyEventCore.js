class TestboyEventCore{

    events = new Map();

    constructor(){

    }

    on(event, callback){
        const events = this.events.get(event);
        if(this.events.has(event)){
            return this.events.set(event, [...events, callback]);
        }
        return this.events.set(event, [callback]);
    }

    emit(event, data){
        const events = this.events.get(event);
        if (Array.isArray(events) && events.length) {
            events.forEach(event => event(data));
        }
    }

}

module.exports = TestboyEventCore;