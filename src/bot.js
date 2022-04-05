require("dotenv").config();

// Events and Commands registry
const { registerCommands, registerEvents } = require("./utils/registry.js");

// Discord
const Discord = require("discord.js-light");

// Bot
const bot = new Discord.Client({
    intents: 32511,
    partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER", "GUILD_SCHEDULED_EVENT"]
});

bot.botVersion = "0.0.1";
bot.devs = ["883720498272403516"];

(async () => {
    bot.commands = new Map();
    bot.cachedMessageReactions = new Map();

    bot.login();
    await registerEvents(bot, "../events");
    await registerCommands(bot, "../commands");
})();

// Posibles errores
process.on("unhandledRejection", error => {
    console.error("Unhandled promise rejection:", error);
    //This will be useful to finding unknown errors sometimes
    if (error.requestData?.json) console.error(inspect(error.requestData.json, { depth: 5 }));
});
  
process.on("uncaughtException", err => {
    bot.destroy();
    console.error("Uncaught exception:", err);
    process.exit(1);
});