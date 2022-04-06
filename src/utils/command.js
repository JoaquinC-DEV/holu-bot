export default class Command {
    constructor(opciones) {
        if (typeof opciones.name !== "string") throw new Error("opciones.name debería ser una string");
        if (typeof opciones.category !== "string") throw new Error("opciones.category debería ser una string");

        // se obtiene del nombre del archivo del comando
        this.name = opciones.name;
        // se obtiene del nombre de la carpeta del comando
        this.category = opciones.category;
        // siempre debe ser un array
        this.aliases = [];
        // siempre debe ser un string vacío
        this.description = "";
        this.permissions = {
            user: [0n, 0n],
            bot: [0n, 0n]
        },
        // solo puede ser utilizado por el dueño (J.)
        this.owner = false;
        // solo puede ser utilizado por los desarrolladores
        this.dev = false;
        // si aparece en el comando help o nombre
        this.secret = false;
    }

    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} message
     * @param {string[]} args
     * @return {Promise<any>}
     * @abstract
     */

    run(bot, message, args) {
        throw new Error(`${this.constructor.name} no tiene el metodo run()`);
    }
}