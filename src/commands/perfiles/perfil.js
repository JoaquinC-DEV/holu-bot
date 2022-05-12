import Discord from "discord.js";
import duration from "../../utils/humanize.js";
export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = ["profile"];
        this.uso = "d/perfil <usuario>"
        this.description = "Obtén información de tu perfil o el de otro usuario.";
    }

    async run (bot, message, args) {
        const usuario = message.mentions.users.first() || message.author;

        const perfil = await bot.models.profiles.findOne({ user_id: usuario.id });

        if (perfil) {
            const embedPerfil = new Discord.MessageEmbed()
            .setTitle(`Perfil de ${usuario.tag}`)
            .setThumbnail(usuario.displayAvatarURL({ dynamic: true }))
            .addField("Perfil creado hace", `${duration(perfil.profile_createdAt)}`)
            .setFooter(`${perfil.profile_description || "Sin descripción..."}`)
            .setColor(bot.config.color);

            return message.channel.send({ embeds: [embedPerfil] });
        } else {
            return message.channel.send(`**${usuario.tag}** no tiene un perfil creado...`);
        }
    }
}