import { getPrefix, setPrefix } from '../../extensions.js';
export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = [];
        this.description = "Cambia el prefix del bot en este servidor.";
        this.uso = "setprefix <prefix>";
        this.permissions = {
            user: [8n, 0n],
            bot: [0n, 0n]
        }
    }

    async run (bot, message, args) {
        if (!args[1]) return message.channel.send(`**${message.author.tag}**, debes introducir el nuevo prefix para este servidor.\n> El prefix actual es: \`${await getPrefix(message.guild)}\``);

        if (args[1].length > 3) return message.channel.send("El nuevo prefix no puede superar los 3 carácteres...");

        const newPrefix = await setPrefix(message.guild, args.slice(1).join(" "));
        await message.channel.send(`Ahora el prefix de este servidor es \`${newPrefix}\``);
    }
}