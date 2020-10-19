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
    /*bot.request('sendMessage', {
        chat_id: message.chat.id,
        text: message.text,
        reply_to_message_id: message.message_id
    });*/
});

bot.onText('oi', (message) => {
    bot.request('sendMessage', {
        chat_id: message.chat.id,
        text: 'Oi tudo bem?',
        reply_to_message_id: message.message_id
    });
});

bot.onCommand('/teste', (message) => {
    if(message.outText){
        bot.request('sendMessage', {
            chat_id: message.chat.id,
            text: 'Tem parametro',
            reply_to_message_id: message.message_id
        });
    }else{
        bot.request('sendMessage', {
            chat_id: message.chat.id,
            text: 'Não tem parametro',
            reply_to_message_id: message.message_id
        });
    }
});