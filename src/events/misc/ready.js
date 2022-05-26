import presence from "../../utils/presence.js";
import connectDB from "../../database/connect.js";
export default async (bot) => {
    await presence(bot);
    connectDB(bot.logs);

    console.log(`¡${bot.user.tag} está listo! Versión: ${bot.botVersion} (shard ${bot.shard?.ids[0] || 0})`);
    bot.logs.send(`¡${bot.user.tag} está listo! Versión: ${bot.botVersion} (shard ${bot.shard?.ids[0] || 0})`);
}