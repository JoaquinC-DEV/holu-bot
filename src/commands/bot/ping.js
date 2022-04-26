export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = [];
        this.description = "Obtén información sobre la latencia del bot";
    }

    run (bot, message, args) {
        message.channel.send(`📡 **Discord API**: ${bot.ws.ping}\n📨 **Mensajes**: ${Math.floor(message.createdTimestamp - Date.now())}`);
    }
}