import { setDescription } from "../../extensions.js";
export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = ["set-description"];
        this.uso = "setdescription [descripción]"
        this.description = "Establece una descripción para tu perfil.";
    }

    run (bot, message, args) {
        const perfil = bot.models.profiles.findOne({ user_id: message.author.id });

        if (!perfil) {
            return message.channel.send(`**${message.author.tag}**, no tienes un perfil creado. Utiliza el comando \`perfil crear\` para crear el tuyo. ;)`);
        } else {
            const description = args.slice(1).join(" ");
            if (description) {
                if (description === perfil.profile_description) return message.channel.send(`**${message.author.tag}**, la nueva descripción es idéntica a tu descripción actual.`);

                setDescription(message.author, description)
                .then(() => message.channel.send(`**${message.author.tag}**, la descripción de tu perfil fue actualizada correctamente...`))
                .catch((err) => message.channel.send(`**${message.author.tag}**, ocurrió un error al intentar actualizar la descripción de tu perfil...\n \`${err}\``));

            } else return message.channel.send(`**${message.author.tag}**, debes ingresar la nueva descripción para tu perfil.`);

        }
    }
}