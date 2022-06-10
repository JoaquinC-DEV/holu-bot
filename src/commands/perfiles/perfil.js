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
            if (usuario.id === message.author.id && args[1] === "crear") {
                const nuevoPerfil = new bot.models.profiles({
                    user_id: message.author.id,
                    profile_description: "Sin descripción",
                    profile_createdAt: Date.now(),
                    profile_xp: 10,
                    profile_lvl: 1,
                    profile_friends: [],
                    profile_money: {
                        coins: 100,
                        diamonds: 0
                    },
                    profile_badges: [],
                    profile_premium: false
                });

                nuevoPerfil.save()
                .then(() => {
                    return message.channel.send(`¡**${message.author.tag}**, tu perfil ha sido creado con exito! ;)`);
                })
                .catch((err) => {
                    return message.channel.send(`**${message.author.tag}**, ocurrió un error al crear tu perfil: \`${err}\`. Informalo en mi servidor de soporte (comando support)`);
                });
            } else if (usuario.id === message.author.id) {
                message.channel.send(`${message.author.toString()}, no tienes un perfil creado... **¿Deseas crearte uno?**\n> Utiliza el comando \`d/perfil crear\`.`);
            } else {  
                message.channel.send(`**${usuario.tag}** no tiene un perfil creado...`);
            }
        }
    }
}