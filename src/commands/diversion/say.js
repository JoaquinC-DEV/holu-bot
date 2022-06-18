export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = ["decir"];
        this.secret = false;
        this.description = "Haz que repita lo que digas.";
        this.uso = "say [algo]";
    }

    run (bot, message, args) {
        if (!args[1]) return message.channel.send("Te faltó poner algo...");

        const mensaje = args.slice(1).join(" ");
        if (mensaje.includes("discord.gg/")) return message.channel.send("El mensaje al parecer tiene una invitación... ¡No puedo repetir eso!");
        if (mensaje.length > 2000) return message.channel.send("¡No puedo repetir mensajes tan largos!");

        if (message.deletable) message.delete();
        
        return message.channel.send(mensaje);
    }
}