import Discord from "discord.js";
export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = [];
        this.description = "Haz una pregunta a la bola mágica.";
        this.uso = "8ball <pregunta>";
    }
    run (bot, message, args) {
        if (!args[1]) return message.channel.send("Te faltó la pregunta...");

        const pregunta = args.slice(1).join(" ");
        if (mensaje.length > 1000) return message.channel.send("¡La pregunta es muy larga!");
        
        const arr = [
            "Puede ser...",
            "Yo creo que sí...",
            "Yo diría que no...",
            "No.",
            "Sí.",
            "Claramente, no.",
            "Claramente, sí.",
            "Es mejor no responder eso...",
            "Definitivamente no responderé esa pregunta...",
            "¿Por qué preguntas eso?",
            "¿Y si le preguntas a la almohada?",
            "No soy bueno respondiendo este tipo de cosas...",
            "La verdad es que... No.",
            "La verdad es que... Sí."
        ];

        const ballEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        .setColor(bot.config.color)
        .addField("Pregunta:", pregunta)
        .addField("Respuesta:", arr[Math.floor(Math.random() * arr.length)])
        .setThumbnail(bot.user.displayAvatarURL())
        .setTimestamp();

        const butRetry = new Discord.MessageButton()
        .setCustomId("8ball_c_redo")
        .setStyle("PRIMARY")
        .setLabel("Repetir");

        const msg = await message.channel.send({ embeds: [ballembed], components: [new Discord.MessageActionRow().addComponents([butRetry])] });

        const filter = (button) => {
            if (button.user.id !== message.author.id) button.reply({ content: "¡Haz tu propia pregunta usando el comando 8ball!", ephemeral: true });
            return button.user.id === message.author.id;
        };

        const col = msg.createMessageComponentCollector({ filter, idle: 15000 });
        col.on("collect", async (button) => {
            if (button.customId === "8ball_c_redo") {
                await button.update({ embeds: [ballembed.spliceFields(1, 1).addField("Respuesta:", arr[Math.floor(Math.random() * arr.length)])] });
            }
        });
        col.on("end", () => msg.edit({ components: [new Discord.MessageActionRow().addComponents([butRetry.setDisabled(true)])] }));
    }
}