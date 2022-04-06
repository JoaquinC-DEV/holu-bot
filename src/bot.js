import 'dotenv/config.js';

// Events and Commands registry
import { registerCommands, registerEvents } from "./utils/registry.js";

// Discord
import Discord from "discord.js-light";
import { inspect } from 'util';

const sweepInterval = 1800;

// Bot
const bot = new Discord.Client({
    intents: 32511,
    partials: ["MESSAGE", "REACTION", "CHANNEL", "GUILD_MEMBER", "USER", "GUILD_SCHEDULED_EVENT"],
    makeCache: Discord.Options.cacheWithLimits({
        GuildScheduledEventManager: 0,
        ApplicationCommandManager: 0,
        BaseGuildEmojiManager: 0,
        GuildEmojiManager: 0,
        ChannelManager: Infinity,
        GuildChannelManager: Infinity,
        GuildBanManager: 0,
        GuildInviteManager: 0,
        GuildManager: Infinity,
        GuildMemberManager: Infinity,
        GuildStickerManager: 0,
        MessageManager: 20,
        PermissionOverwriteManager: Infinity,
        PresenceManager: 0,
        ReactionManager: 0,
        ReactionUserManager: 0,
        RoleManager: Infinity,
        StageInstanceManager: Infinity,
        ThreadManager: Infinity,
        ThreadMemberManager: 0,
        UserManager: Infinity,
        VoiceStateManager: Infinity
    }),
    sweepers: {
        guildMembers: {
          interval: sweepInterval,
          filter: () => (member) => {
            if (member.id === bot.user.id) return false;
            if (member.voice.channelId && bot.distube.voices.collection.some(e => e.channel.id === member.voice.channelId)) return false;
            if (member.pending) return false;
            return true;
          }
        },
        users: {
          interval: sweepInterval,
          filter: () => (user) => {
            if (user.id === bot.user.id) return false;
            if (user.mine) return false;
            return true;
          }
        }
    },
    allowedMentions: {
        parse: []
    },
    restGlobalRateLimit: 50
});

bot.botVersion = "0.0.1";
bot.config = {
    color: "random"
};

(async () => {
    bot.commands = new Discord.Collection();
    bot.cachedMessageReactions = new Discord.Collection();

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