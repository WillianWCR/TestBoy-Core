class TestboyEventCore{
    //TODO #4 Add documentation in functions inside TestboyEventCore

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

    onCommand(command, callback){
        //TODO #3 Check if the command is followed by a Bot username
        return this.on('message.text', (message) => {
            const commandText = message.text.split(' ')[0];
            message.outText = message.text.substring(commandText.length);
            return commandText.match(/^\/.+/) && commandText == command ? callback(message): false;
        });
    }

    onText(text, callback){
        this.on('message.text', (message) => {
            if(message.text.match(text)){
                callback(message);
            }
        });
    }

}

module.exports = TestboyEventCore;