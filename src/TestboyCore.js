const got = require('got');
const debug = require('debug');
const TestboyPollingCore = require('./TestboyPollingCore');
const TestboyEventCore = require('./TestboyEventCore');
const TestboyMethods = require('./TestboyMethods');

class TestboyCore extends TestboyEventCore{

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
        super();
        this.token = token; //TODO: #1 Create verify method to check if the token is valid
        this.options = options;
        this.options.polling = (typeof options.polling === 'undefined') ? false : options.polling;
        this.options.debug = (typeof options.debug === 'undefined') ? false : options.debug;
        this.options.webHook = (typeof options.webHook === 'undefined') ? false : options.webHook;
        this.options.baseApiUrl = options.baseApiUrl || 'https://api.telegram.org';

        //Create empty debug function
        this.debug = ()=>{};
        //Check if debug is enable
        if(this.options.debug){
            this.debug = debug('TestboyCore');
            debug.enable('*');
            this.debug('Enable debug!');
        }

        if(options.polling){
            this.startPolling();
        }

        //const methods = new TestboyMethods(this);

        //Object.assign(this.methods, methods);

        //console.log(methods.sendMessage());
        //console.log(this);

        //this.sendMessage();

    }

    /**
     * Make requests to the API
     * @param {String} path 
     * @param {Object} [options]
     * @returns {Promise}
     */
    request(path, options = {}){
        //this.debug('Request:', path, options);
        return got.post(
            this.baseUrl(path),
            {
                searchParams: new URLSearchParams(options)
            }
        ).then(response => {
            let data;
            try{
                data = JSON.parse(response.body);
            }catch(error){
                this.debug(error);
            }
            
            if(data.ok){
                return data.result;
            }
        }).catch(error => {
            this.debug(error.response.body);
        });
    }

    /**
     * Creates the Base URL for API Calls
     * @param {String} path
     * @private
     * @return {String} url
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
    getUpdates(options = {}){
        //this.debug('Getting updates');
        var {timeout, limit, offset} = options;
        return this.request('getUpdates', {
            timeout,
            limit,
            offset,
        });
    }

    /**
     * Import TestboyPollingCore, assign to TestboyCore and start Polling
     * @param {Object} options 
     * @returns {Promise}
     */
    startPolling(options = {}){
        this.debug('Importing PollingCore');
        if(!this._polling){
            this._polling = new TestboyPollingCore(this);
        }
        return this._polling.start(options);
    }

    /**
     * 
     * @param {Object} update 
     */
    proccessUpdate(update){
        //this.debug('Proccess Update', update.update_id);
        const message = update.message;
        const edited_message = update.edited_message;
        const channel_post = update.channel_post;
        const edited_channel_post = update.edited_channel_post;
        const inline_query = update.inline_query;
        const chosen_inline_result = update.chosen_inline_result;
        const callback_query = update.callback_query;
        const shipping_query = update.shipping_query;
        const pre_checkout_query = update.pre_checkout_query;
        const poll = update.poll;
        const poll_answer = update.poll_answer;

        if(message){
            if(message.text){
                this.emit('message.text', message);
            }
        }
        if(callback_query){

        }
    }
}

/* Exports */
module.exports = TestboyCore;