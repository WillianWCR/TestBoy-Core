require('dotenv').config();

const Testboy = require('..');

const bot = new Testboy(process.env.botToken, {
    'polling': true,
    'debug': true
});