const debug = require('debug');

class TestboyPollingCore {
    
    /**
     * @class TestboyPollingCore
     * @constructor
     * @param {TestBoyCore} bot 
     */
    constructor(bot){
        this.bot = bot;
        this.options = (typeof bot.options.polling === 'boolean') ? {} : bot.options.polling;
        this._lastRequest = null;
        this.debug = debug('TestboyPollingCore');
        this.debug("Construct polling");
    }

    start(options = {}){
        this.debug("Start polling");
        this._polling();
    }

    async _polling(){
        this.debug("Polling");
        this._getUpdates()
        .then(updates => {
            updates.forEach(update => {
                this.debug('Asking to proccess update');
                this.bot.proccessUpdate(update);
            });
        })
        .catch(error => {
            this.debug(error);
        });
    }

    _getUpdates(){
        this.debug("Asking to get updates");
        return this.bot.getUpdates();
    }

}

module.exports = TestboyPollingCore;