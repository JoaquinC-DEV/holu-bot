// 
export default async (bot) => {
    const presences = [
        [{
            name: `${bot.config.prefix}help`,
            type: "PLAYING"
        }],
        [{
            name: `${bot.config.prefix}support`,
            type: "PLAYING"
        }]
    ];

    // https://discord.js.org/#/docs/discord.js/stable/class/ClientUser?scrollTo=setPresence
    await bot.user.setPresence({
        activities: presences[Math.floor(Math.random() * presences.length)],
        status: "online"
    });
}