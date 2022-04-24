export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = ["profile"];
        this.uso = "d/perfil <usuario>"
        this.description = "Obtén información de tu perfil o el de otro usuario.";
    }

    run (bot, message, args) {
        return message.channel.send("Pronto...");
    }
}