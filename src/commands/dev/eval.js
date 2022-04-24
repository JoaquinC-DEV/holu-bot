import Discord from "discord.js-light";
import util from "util";

export default class extends Command {
    constructor(options) {
        super(options);
        this.aliases = ["e"];
        this.secret = true;
        this.description = "Ejecuta scripts rápidamente.";
        this.dev = true;
        this.uso = "d/eval [script]";
    }

    async run (bot, message, args) {
        if (!args[1]) return message.channel.send("Te faltó algo...");
    try {
        let evaluated = eval(args.slice(1).join(" "));
        if (evaluated instanceof Promise) {
            const m = message.channel.send("Evaluando promise...");
            evaluated.then((async e => {
                let evaluated = e;
                if (typeof evaluated !== "string") evaluated = util.inspect(evaluated, { depth: 0 });
                const arr = Discord.Util.splitMessage(evaluated, { maxLength: 1950, char: "" });
                (await m).edit(Discord.Formatters.codeBlock("js", arr[0]));
            })).catch((async e => {
                let evaluated = e;
                if (typeof evaluated !== "string") evaluated = util.inspect(evaluated, { depth: 0 });
                const arr = Discord.Util.splitMessage(evaluated, { maxLength: 1950, char: "" });
                (await m).edit(Discord.Formatters.codeBlock("js", arr[0]));
            }));
        } else {
            if (typeof evaluated !== "string") evaluated = util.inspect(evaluated, { depth: 0 });
            const arr = Discord.Util.splitMessage(evaluated, { maxLength: 1950, char: "" });
            await message.channel.send(Discord.Formatters.codeBlock("js", arr[0]));
        }
    } catch (err) {
            let algo = err;
            if (typeof algo !== "string") algo = util.inspect(algo, { depth: 0 });
            const arr = Discord.Util.splitMessage(algo, { maxLength: 1950, char: "" });
            await message.channel.send(Discord.Formatters.codeBlock("js", arr[0]));
        }
    }
}