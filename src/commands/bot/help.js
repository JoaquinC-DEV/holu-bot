import def from "../../assets/definitions.json";
import Discord from "discord.js";
const buttons = [
  new Discord.MessageButton().setLabel("Soporte").setStyle("LINK").setURL("https://discord.gg/M35kV5Ez3v"),
  new Discord.MessageButton().setLabel("GitHub").setStyle("LINK").setURL("https://github.com/JoaquinC-DEV/holu-bot"),
];
const action = Discord.MessageActionRow.prototype.addComponents.apply(new Discord.MessageActionRow(), buttons);

export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = ["h", "comandos", "commands", "ayuda"];
        this.description = "Comando de ayuda";
        this.uso = "help <categoría/comando>";
    }

    run (bot, message, args) {
      const bc = bot.commands;
      const arr = [];

      for (const o of Object.entries(def)) {
        arr.push({
          categoryname: o[0],
          category: o[1].name,
          secret: o[1].secret,
          commands: bc.filter(z => z.category === o[0]).map(e => e)
        })
      }

      if (args[1] && arr.find(d => d.categoryname === args[1])) {
        const g = arr.find(d => d.categoryname === args[1]);
        
        if (checkEmbed(message.channel)) {
          const embed = new Discord.MessageEmbed()
          .setThumbnail(bot.user.displayAvatarURL())
          .setColor(bot.config.color)
          .setTitle(g.category + " (" + g.commands.length + " comandos)")
          .setDescription(Discord.Util.splitMessage(g.commands.filter(s => {
            if (s.secret) return false
            return true
          }).map(s => "**" + s.name + "**: " + s.description).join("\n"))[0])
          .setTimestamp();

          message.channel.send({ embeds: [embed], components: [new Discord.MessageActionRow().addComponents(buttons[1])] });
      } else {
        const str = `__**${g.category + " (" + g.commands.length + " comandos)"}**__\n\n${Discord.Util.splitMessage(g.commands.filter(s => {
          if (s.secret) return false;
          if (s.onlyguild && (message.guild ? (message.guild.id !== process.env.GUILD_ID) : true)) return false;
          return true;
        }, { maxLength: 1800 }).map(s => "**" + s.name + "**: " + s.description).join("\n"))[0]}`;
        message.channel.send({ content: str, components: [new Discord.MessageActionRow().addComponents(buttons[1])] });
      }
      return;
    } else if (args[1] && (bot.commands.get(args[1].toLowerCase()) || bot.commands.find(c => c.aliases.includes(args[1].toLowerCase())))) {
      const command = bot.commands.get(args[1].toLowerCase()) || bot.commands.find(c => c.aliases.includes(args[1].toLowerCase()))
      if (command.dev) return message.channel.send(`El comando **${command.name}** es exclusivo para desarrolladores...`);
      let alias = "Sin aliases";
      if (command.aliases.length !== 0) {
        alias = command.aliases.join(", ");
      }
      if (checkEmbed(message.channel)) {
        const embed = new Discord.MessageEmbed()
          .setThumbnail(bot.user.displayAvatarURL())
          .setTitle(`Comando "${command.name}"`)
          .addField("Descripción:", command.description ? command.description : "Sin descripción.")
          .addField("Categoría:", command.category ? command.category : "Sin categoría.")
          .addField("Uso:", `\`${command.uso}\``)
          .addField("Permisos requeridos:", `Usuario: \`${!(new Discord.Permissions(command.permissions.user[0]).has(8n)) ? (new Discord.Permissions(command.permissions.user[0]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR"}\`\nBot: \`${!(new Discord.Permissions(command.permissions.bot[0]).has(8n)) ? (new Discord.Permissions(command.permissions.bot[0]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR"}\``)
          .addField("Permisos requeridos (dentro de un canal)", `Usuario: \`${!(new Discord.Permissions(command.permissions.user[1]).has(8n)) ? (new Discord.Permissions(command.permissions.user[1]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR"}\`\nBot: \`${!(new Discord.Permissions(command.permissions.bot[1]).has(8n)) ? (new Discord.Permissions(command.permissions.bot[1]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR"}\``)
          .addField("Aliases", alias)
          .setColor(bot.config.color)
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      } else {
        const perms = `Usuario: \`${!(new Discord.Permissions(command.permissions.user[0]).has(8n)) ? (new Discord.Permissions(command.permissions.user[0]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR"}\`\nBot: \`${!(new Discord.Permissions(command.permissions.bot[0]).has(8n)) ? (new Discord.Permissions(command.permissions.bot[0]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR"}\``;

        const perms_channel = `Usuario: \`${!(new Discord.Permissions(command.permissions.user[1]).has(8n)) ? (new Discord.Permissions(command.permissions.user[1]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR"}\`\nBot: \`${!(new Discord.Permissions(command.permissions.bot[1]).has(8n)) ? (new Discord.Permissions(command.permissions.bot[1]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR"}\``;

        const str = `__**Comando "${command.name}"**__\n\n__Descripción__: ${command.description ? command.description : "Sin descripción"}\n__Permisos requeridos__: ${perms}\n__Permisos requeridos (dentro de un canal)__: ${perms_channel}\n__Aliases__: ${alias}`;

        return message.channel.send(str);
      }
    } else {
      const text = "Usa `help <categoría>` para obtener todos los comandos de esa categoría\n\n__**Categorías disponibles:**__\n" + Discord.Util.splitMessage(arr.filter(s => {
        if (s.secret) return false;
        return true;
      }).map(s => "**" + s.categoryname + "**: " + s.category).join("\n"))[0];
      if (checkEmbed(message.channel)) {
        const embed = new Discord.MessageEmbed()
          .setThumbnail(bot.user.displayAvatarURL())
          .setColor(bot.config.color)
          .setTitle(`${bot.user.username} Bot`)
          .setDescription(text || "?")
          .setTimestamp();
        message.channel.send({ embeds: [embed], components: [action] });
      } else {
        const str = `__**${bot.user.username} Bot**__\n\n${text}`;
        message.channel.send({ content: str, components: [action] });
      }
      return;
    }
  }
}

/**
 * 
 * @param {Discord.Channel} channel The channel to check permissions.
 * @returns {boolean} "true" if you can send embeds, otherwise "false".
 */
 function checkEmbed(channel) {
    if (!channel.guild) return true;
    return channel.permissionsFor(channel.guild.me.id).has(16384n);
}