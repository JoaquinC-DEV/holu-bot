import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
export default class extends Command {
  constructor(options) {
    super(options);
    this.aliases = ["discordjs"];
    this.description = "Obtén información desde la documentación de Discord.js";
    this.permissions = {
      user: [0n, 0n],
      bot: [0n, 16384n]
    };
    this.uso = "djs [Function/Class/Typedefs]";
  }
  async run(bot, message, args) {
    if (!args[1]) return message.channel.send("¿Qué es lo que quieres buscar en la documentación de Discord.js?");
    let src = "";
    let cont = "";
    if (["stable", "master", "commando", "rpc", "akairo", "akairo-master", "collection"].includes(args[1]?.toLowerCase())) {
        src = args[1];
        cont = args.slice(2).join(" ");
    } else {
        src = "stable";
        cont = args.slice(1).join(" ");
    }
    const page = `https://djsdocs.sorta.moe/v2/embed?src=${encodeURIComponent(src)}&q=${encodeURIComponent(cont)}`;

    // eslint-disable-next-line no-undef
    await fetch(page).then(async r => {
        const res = await r.json();
        if (res.error) return message.channel.send({ embeds: [new MessageEmbed().setTitle("Error " + res.status).setDescription(res.error + ": " + res.message)] });

        await message.channel.send({ embeds: [new MessageEmbed(res)] });
    }).catch((err) => message.channel.send(`Ocurrió un error al intentar consultar a la documentación: \`${err.message}\``));
  }
}