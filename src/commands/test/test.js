export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = ["prueba"];
        this.secret = true;
        this.description = "Este es un comando de prueba";
        this.dev = true;
    }

    run (bot, message) {
        return message.channel.send("El comando funciona!");
    }
}