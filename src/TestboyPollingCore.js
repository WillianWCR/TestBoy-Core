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
        this.options.interval = (typeof this.options.interval === 'number') ? this.options.interval : 300;
        this.options.params = (typeof this.options.params === 'object') ? this.options.params : {}
        this.options.params.offset = (typeof this.options.params.offset === 'number') ? this.options.params.offset : 0;
        this.options.params.limit = (typeof this.options.params.limit === 'number') ? this.options.params.limit : 1;
        this.options.params.timeout = (typeof this.options.params.timeout === 'number') ? this.options.params.timeout : 0;
        
        this._lastUpdate = 0;
        this._lastRequest = null;
        this.debug = debug('TestboyPollingCore');
        this.debug("Construct polling");
    }

    start(options = {}){
        this.debug("Start polling");
        this._polling();
    }

    async _polling(){
        //this.debug("Polling");
        this._lastRequest = this
        ._getUpdates()
        .then(updates => {
            this._lastUpdate = Date.now();
            updates.forEach(update => {
                this.options.params.offset = update.update_id + 1;
                //this.debug('Asking to proccess update');
                this.bot.proccessUpdate(update);
            });
            return null;
        })
        .catch(error => {
            this.debug(error);
        })
        .finally(() => {
            setTimeout(() => this._polling(), this.options.interval);
        });
        return this._lastRequest;
    }

    _getUpdates(){
        //this.debug("Asking to get updates", this.options.params);
        return this.bot.getUpdates(this.options.params);
    }

}

module.exports = TestboyPollingCore;