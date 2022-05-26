import 'dotenv/config.js';
import Discord from "discord.js-light";

const logs = new Discord.WebhookClient({
	id: "979410189843308614",
	token: process.env.LOGS_TOKEN
});

/**
 * 
 * @param {string} logMessage The log message
 * @param {object} logData Log data (type, category)
 * @returns {Promise}
 */
export default function logging(logMessage, logData) {
    
    const logEmbed = new Discord.MessageEmbed()
    .setDescription(`**${logMessage}**`)
    .setTimestamp()

    // Color
    if (logData.type === "error") {
        logEmbed.setColor("RED")
        logEmbed.setTitle("¡Ocurrió un error!");
    } else if (logData.type === "warn") {
        logEmbed.setColor("ORANGE")
        logEmbed.setTitle("¡Advertencia!");
    } else if (logData.type === "correct") {
        logEmbed.setColor("GREEN")
        logEmbed.setTitle("¡Operación realizada correctamente!");
    } else if (logData.type === "info") {
        logEmbed.setColor("BLUE")
        logEmbed.setTitle("Información relevante");
    } else {
        logEmbed.setColor("GREY")
        logEmbed.setTitle("Información desconocida");
    }

    // Category
    if (logData.category === "shards") logEmbed.addField("Categoría:", `SHARDS`);
    else if (logData.category === "bot") logEmbed.addField("Categoría:", `BOT`);
    else if (logData.category === "db") logEmbed.addField("Categoría:", `DATABASE`);
    else logEmbed.addField("Categoría:", `Desconocida`);

    return logs.send({
        embeds: [logEmbed],
        content: logData.type === "error" ? "<@&961007727201648671>" : undefined
    });
}