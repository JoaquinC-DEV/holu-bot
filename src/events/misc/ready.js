import presence from "../../utils/presence.js";
export default async (bot) => {
    await presence(bot);

    console.log(`¡${bot.user.tag} está listo! Versión: ${bot.botVersion} (shard ${bot.shard?.ids[0] || 0})`)
}