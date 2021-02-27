require('dotenv').config();

const Testboy = require('../src/Testboy');

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

bot.onText(/.*teste.*/, (message) => {
    bot.request('sendMessage', {
        chat_id: message.chat.id,
        text: 'Você falou teste em algum lugar da mensagem',
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

bot.onCommand('/button', (message) => {
    bot.request('sendMessage', {
        chat_id: message.chat.id,
        text: 'Tem parametro',
        reply_to_message_id: message.message_id,
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {
                        'text': 'Clique aqui!',
                        'callback_data': 'click-button'
                    }
                ]
            ]
        })
    });
});