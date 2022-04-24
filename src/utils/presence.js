// 
export default async (bot) => {
    const presences = [
        [{
            name: "d/help",
            type: "PLAYING"
        }],
        [{
            name: "d/support",
            type: "PLAYING"
        }]
    ];

    // https://discord.js.org/#/docs/discord.js/stable/class/ClientUser?scrollTo=setPresence
    await bot.user.setPresence({
        activities: presences[Math.floor(Math.random() * presences.length)],
        status: "online"
    });
}