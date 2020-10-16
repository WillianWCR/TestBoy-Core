
class TestBoyCore{

    /**
     * @class TestBoyCore
     * @constructor
     * @param {String} token Bot Token
     * @param {Object} [options] Custom options
     * @param {String} [options.baseApiUrl="https://api.telegram.org"] Change the base API URL
     * @see https://core.telegram.org/bots/api
     */
    constructor(token, options = {}){
        this.token = token;
        this.options = options;
        this.options.baseApiUrl = options.baseApiUrl || 'https://api.telegram.org';
    }

}

/* Exports */
module.exports = TestBoyCore;