require("dotenv").config();
const Discord = require("discord.js-light");

// Bot
const bot = new Discord.Client({
    intents: 32511,
    partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER", "GUILD_SCHEDULED_EVENT"]
});

bot.botVersion = "0.0.1";
bot.devs = ["883720498272403516"];

// Discord Login
bot.login();