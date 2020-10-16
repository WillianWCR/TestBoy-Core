const TelegramBot = require('..');

const bot = new TelegramBot('123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11', {
    'arg1' : 'textarg1'
});

bot._getUpdates();