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
        try{
            this._lastRequest = await this._getUpdates();
        }catch(error){
            this.debug(error);
        }
    }

    async _getUpdates(){
        this.debug("Asking to get updates");
        return await this.bot.getUpdates();
    }

}

module.exports = TestboyPollingCore;