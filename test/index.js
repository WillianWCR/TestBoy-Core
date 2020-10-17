require('dotenv').config();

const Testboy = require('..');

const bot = new Testboy(process.env.botToken, {
    polling: {
        params: {
            limit: 10
        }
    },
    debug: true
});

bot.request('sendMessage', {
    chat_id: 180310752,
    text: 'teste'
});