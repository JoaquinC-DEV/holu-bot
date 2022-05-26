import presence from "../../utils/presence.js";
import connectDB from "../../database/connect.js";
export default async (bot) => {
    await presence(bot);
    connectDB(bot.sendLogs);

    console.log(`¡${bot.user.tag} está listo! Versión: ${bot.botVersion} (shard ${(bot.shard?.ids[0] || 0) + 1})`);
    bot.sendLogs(`¡${bot.user.tag} está listo! Versión: ${bot.botVersion} (shard ${(bot.shard?.ids[0] || 0) + 1})`, {
        type: "correct",
        category: "bot"
    });
}