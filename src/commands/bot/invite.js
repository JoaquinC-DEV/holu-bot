import Discord from "discord.js-light";
export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = ["invitar"];
        this.description = "Obtén mi URL de invitación.";
        this.uso = "invite";
    }

    run (bot, message, args) {
        const inviteEmbed = new Discord.MessageEmbed()
        .setURL("https://discord.com/api/oauth2/authorize?client_id=960677134739861505&permissions=8&scope=bot")
        .setTitle("¡Haz click aquí!")
        .setDescription("¡Invitame a tus servidores haciendo click!")
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(bot.config.color)
        .setFooter("Si tienes problemas al invitarme, ingresa a https://discord.gg/M35kV5Ez3v", message.author.displayAvatarURL())

        message.channel.send({ embeds: [inviteEmbed] });
    }
}