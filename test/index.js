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

bot.on('message.text', (message) => {
    bot.debug(message.from.id, message.text);
    bot.request('sendMessage', {
        chat_id: message.chat.id,
        text: message.text,
        reply_to_message_id: message.message_id
    })
});