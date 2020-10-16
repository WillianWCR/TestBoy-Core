const got = require('got');
const TestboyPollingCore = require('./TestboyPollingCore');

class TestboyCore{

    /**
     * @class TestboyCore
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

    /**
     * 
     * @param {String} _path 
     * @param {Object} [options] 
     */
    async _request(_path, options = {}){
        try{
            const response = await got.post(
                this._baseUrl(_path),
                new URLSearchParams(options)
            );
        }catch(error){
            console.log(error.response.body);
        }
    }

    /**
     * Creates the Base URL for API Calls
     * @param {String} _path
     * @return {String} url
     * @private
     */
    _baseUrl(_path = ''){
        return `${this.options.baseApiUrl}/bot${this.token}/${_path}`;
    }

    /**
     * 
     * @param {Object} [options] 
     * @param {Number} timeout Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling.
     * @param {Number} limit Limits the number of updates to be retrieved.
     * @param {Number} offset Identifier of the first update to be returned.
     * @see https://core.telegram.org/bots/api#getupdates
     */
    _getUpdates(options = {}){
        var {timeout, limit, offset} = options;
        return this._request('getUpdates', {
            timeout,
            limit,
            offset,
        });
    }

}

/* Exports */
module.exports = TestboyCore;