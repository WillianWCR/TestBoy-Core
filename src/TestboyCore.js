const got = require('got');
const debug = require('debug');
const TestboyPollingCore = require('./TestboyPollingCore');

class TestboyCore{

    /**
     * @class TestboyCore
     * @constructor
     * @param {String} token Bot Token
     * @param {Object} [options] Custom options
     * @param {Boolean|Object} [options.polling=false] Set true to enable polling or set options.
     * @param {Boolean|Object} [options.webHook=false] Set true to enable webHook or set options.
     * @param {Boolean} [options.debug=false] Set true to enable debug
     * @param {String} [options.baseApiUrl="https://api.telegram.org"] Change the base API URL
     * @see https://core.telegram.org/bots/api
     */
    constructor(token, options = {}){
        this.token = token;
        this.options = options;
        this.options.polling = (typeof options.polling === 'undefined') ? false : options.polling;
        this.options.debug = (typeof options.debug === 'undefined') ? false : options.debug;
        this.options.webHook = (typeof options.webHook === 'undefined') ? false : options.webHook;
        this.options.baseApiUrl = options.baseApiUrl || 'https://api.telegram.org';

        if(this.options.debug){
            this.debug = debug('TestboyCore');
            debug.enable('*');
            this.debug('Enable debug!');
        }

        if(options.polling){
            this.startPolling();
        }

    }

    /**
     * Make requests to the API
     * @param {String} path 
     * @param {Object} [options] 
     */
    async request(path, options = {}){
        try{
            this.debug('Requesting', path, options);
            const response = await got.post(
                this.baseUrl(path),
                new URLSearchParams(options)
            );
            this.debug('Request response', response.body);
            return JSON.parse(response.body);
        }catch(error){
            this.debug(error.response.body);
        }
    }

    /**
     * Creates the Base URL for API Calls
     * @param {String} path
     * @return {String} url
     * @private
     */
    baseUrl(path = ''){
        return `${this.options.baseApiUrl}/bot${this.token}/${path}`;
    }

    /**
     * Make request to the API searching for updates
     * @param {Object} [options] 
     * @param {Number} timeout Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling.
     * @param {Number} limit Limits the number of updates to be retrieved.
     * @param {Number} offset Identifier of the first update to be returned.
     * @see https://core.telegram.org/bots/api#getupdates
     */
    async getUpdates(options = {}){
        this.debug('Getting updates', options);
        var {timeout, limit, offset} = options;
        return await this.request('getUpdates', {
            timeout,
            limit,
            offset,
        });
    }

    startPolling(options = {}){
        this.debug('Start Polling');
        if(!this._polling){
            this._polling = new TestboyPollingCore(this);
        }
        return this._polling.start(options);
    }
}

/* Exports */
module.exports = TestboyCore;