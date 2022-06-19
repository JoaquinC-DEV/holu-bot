export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = [];
        this.description = "Obtén información sobre la latencia del bot";
        this.uso = "ping";
    }

    run (bot, message, args) {
        message.channel.send(`📡 **Discord API**: ${bot.ws.ping}\n📨 **Mensajes**: ${Math.floor(Date.now() - message.createdTimestamp)}`);
    }
}