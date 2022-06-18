// https://github.com/AndreMor8/gidget/blob/master/src/old_commands/image/emojify.js
import discord from 'discord.js-light';
import mediaExtractor from 'media-extractor';
import parser from 'twemoji-parser';
const { MessageAttachment, MessageButton, MessageActionRow } = discord;

export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = [];
        this.secret = false;
        this.description = "Convierte un emoji normal a gif";
        this.uso = "emojify [emoji/imagen]";
    }

    async run (bot, message, args) {
        if (!args[1] && !message.attachments.first()) return message.channel.send("Uso: `emojify [emoji/imagen]`");
        let url;
        const user = (args[1] || message.mentions.users.first()) ? (message.mentions.users.first() || bot.users.cache.get(args[1]) || bot.users.cache.find(e => (e.username === args.slice(1).join(" ") || e.tag === args.slice(1).join(" ") || e.username?.toLowerCase() === args.slice(1).join(" ")?.toLowerCase() || e.tag?.toLowerCase() === args.slice(1).join(" ")?.toLowerCase())) || message.guild?.members.cache.find(e => (e.nickname === args.slice(1).join(" ") || e.nickname?.toLowerCase() === args.slice(1).join(" ")?.toLowerCase()))?.user || await bot.users.fetch(args[1]).catch(() => { })) : null;

        if (user) {
            url = user.displayAvatarURL({ format: "png", dynamic: true, size: 64 });
        } else if (message.attachments.first()) {
            url = message.attachments.first().url;
        } else if (args[1].match(/<?(a:|:)\w*:(\d{17}|\d{18})>/)) {
            const matched = args[1].match(/<?(a:|:)\w*:(\d{17}|\d{18})>/);
            const ext = args[1].startsWith("<a:") ? ("gif") : ("png");
            url = `https://cdn.discordapp.com/emojis/${matched[2]}.${ext}`;
        } else if ((/tenor\.com\/view/.test(args[1]) || /tenor.com\/.+\.gif/.test(args[1]) || /giphy\.com\/gifs/.test(args[1])) && await mediaExtractor.resolve(args[1])) {
            url = await mediaExtractor.resolve(args[1]);
        } else if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/gm.test(args[1])) {
            url = args[1];
        }

        const parsed = parser.parse(args[1]);
        if (parsed.length >= 1) url = parsed[0].url
        if (!url) return message.channel.send("URL inválida");
        const { pre_type, buffer } = await render(url);

        const but_add = new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("emojify_c_add2sv")
        .setLabel("Añadir al servidor")
        .setDisabled(!(message.guild?.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") && message.member?.permissions.has("MANAGE_EMOJIS_AND_STICKERS")));

        const att = new MessageAttachment(buffer, `emoji.gif`);
        const filter = (button) => {
            if (button.user.id !== message.author.id) button.reply({ content: "No estás autorizado.", ephemeral: true });
            return button.user.id === message.author.id;
        };
        const here = await message.channel.send({ files: [att], components: [new MessageActionRow().addComponents([but_add])] });

        if (!but_add.disabled) {
            const butcol = here.createMessageComponentCollector({ filter, idle: 60000 });
            butcol.on("collect", async (button) => {
                if (!(message.guild?.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS") && message.member?.permissions.has("MANAGE_EMOJIS_AND_STICKERS"))) return button.reply("Nope", true);
                await button.reply("¿Cuál será el nombre del nuevo emoji? (30 segundos para responder).");
                butcol.stop("a");
                here.edit({ components: [new MessageActionRow().addComponents([but_add.setDisabled(true)])] });
                const col = message.channel.createMessageCollector({ filter: (e) => e.author.id === message.author.id, time: 30000 });
                col.on("collect", (msg) => {
                    message.guild.emojis.create((pre_type == "svg") ? buffer : url, msg.content, { reason: "Holu emojify" }).then((e) => {
                        button.editReply(`Emoji creado correctamente -> ${e.toString()}`);
                    }).catch(e => button.editReply("Error: " + e))
                        .finally(() => {
                            msg.delete();
                            col.stop();
                        });
                });
                col.on("end", (c, r) => { if (r === "time") button.editReply("¡Tiempo terminado!") });
            });
            butcol.on("end", (c, r) => { if (r === "idle") here.edit({ components: [new MessageActionRow().addComponents([but_add.setDisabled(true)])] }) })
        }
    }
}