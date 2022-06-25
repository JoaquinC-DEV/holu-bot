import Discord from "discord.js-light";
import { getPrefix } from "../../extensions.js";

const internalCooldown = new Set();

export default async (bot, message) => {
    if (message.author.bot) return;
    if (message.guild && !message.channel.permissionsFor(bot.user.id)?.has("SEND_MESSAGES")) return;

    const prefix = message.guild ? await getPrefix(message.guild) : "h!";
    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(prefix)) {
        if (internalCooldown.has(message.author.id)) return;
        // args[0] es el nombre del comando
        const args = message.content.substring(prefix.length).trimEnd().split(/ +/g);
        if (!args[0]) return;

        const command = bot.commands.get(args[0].toLowerCase()) || bot.commands.find(a => a.aliases.includes(args[0].toLowerCase()));
        if (command) {
            // Always fetch channel and member
            await message.channel.fetch({ cache: true }).catch(() => { });
            await message.member?.fetch({ cache: true }).catch(() => { });
            
            if (command.owner && message.author.id !== "883720498272403516") return message.reply("Solo Jko puede usar este comando...");
            if (command.dev && message.author.id !== "883720498272403516") {
                if (!process.env.DEVS.split(",").includes(message.author.id)) return message.reply("Solo mis desarrolladores pueden usar este comando...");
            }
            
            if (message.guild) {
                const userperms = message.member.permissions;
                const userchannelperms = message.channel.permissionsFor(message.author.id);
                const botperms = message.guild.me.permissions;
                const botchannelperms = message.channel.permissionsFor(bot.user.id);
                
                if (message.author.id !== "883720498272403516") {
                    if (!userperms.has(command.permissions.user[0])) return message.channel.send("No tienes los permisos necesarios para usar este comando...\nPermisos requeridos:\n`" + (!(new Discord.Permissions(command.permissions.user[0]).has(8n)) ? (new Discord.Permissions(command.permissions.user[0]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR") + "`");

                    if (!userchannelperms.has(command.permissions.user[1])) return message.channel.send("No tienes los permisos necesarios para usar este comando **en este canal**.\nPermisos requeridos:\n`" + (!(new Discord.Permissions(command.permissions.user[1]).has(8n)) ? (new Discord.Permissions(command.permissions.user[1]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR") + "`");
                }

                if (!botperms.has(command.permissions.bot[0])) return message.channel.send("Vaya... No tengo los permisos suficientes para ejecutar este comando.\nPermisos requeridos:\n`" + (!(new Discord.Permissions(command.permissions.bot[0]).has(8n)) ? (new Discord.Permissions(command.permissions.bot[0]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR") + "`");

                if (!botchannelperms.has(command.permissions.bot[1])) return message.channel.send("Vaya... No tengo los permisos suficientes para ejecutar este comando **en este canal**.\nPermisos requeridos:\n`" + (!(new Discord.Permissions(command.permissions.bot[1]).has(8n)) ? (new Discord.Permissions(command.permissions.bot[1]).toArray().join(", ") || "Ninguno") : "ADMINISTRATOR") + "`");
            }

            try {
                internalCooldown.add(message.author.id);
                await command.run(bot, message, args);
            } catch (err) {
                if (err.name === "StructureError") return message.channel.send(err.message).catch(() => { });
                console.error(err);
          
                await message.channel.send("Ocurrió un error inesperado... " + err).catch(() => { });
            } finally {
                internalCooldown.delete(message.author.id);
            }
        }
    }
}