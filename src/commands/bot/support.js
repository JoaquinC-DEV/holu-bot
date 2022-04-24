export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = ["soporte"];
        this.secret = false;
        this.description = "Comando de soporte.";
        this.dev = false;
    }

    async run (bot, message, args) {
        const supportMessage = `¡Hola, ${message.author.toString()}!\nSi necesitas ayuda con alguna de mis funciones o tienes algún problema o sugerencia que quieras hacerle saber a mi desarrollador, puedes unirte a mi Servidor de soporte.\n\n> https://discord.gg/M35kV5Ez3v`;

        message.author.send(supportMessage)
        .then(() => message.channel.send(`**${message.author.tag}**, te he enviado información por mensajes directos. ;)`))
        .catch(() => message.channel.send(`**${message.author.tag}**, al parecer no puedo enviarte mensajes directos... Igualmente, aquí tienes la invitación a mi servidor de soporte: https://discord.gg/M35kV5Ez3v`))
    }
}