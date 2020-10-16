require('dotenv').config();

const TelegramBot = require('..');

const bot = new TelegramBot(process.env.botToken, {
    'polling': true
});

bot.getUpdates();