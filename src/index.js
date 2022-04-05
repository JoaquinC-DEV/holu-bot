require("dotenv").config();

const webserver = require("./webserver.js");
const Discord = require("discord.js-light");

const execArgv = ["--experimental-json-modules", "--expose-gc", "--optimize_for_size"];
const manager = new Discord.ShardingManager("./src/bot.js", {
	token: process.env.DISCORD_TOKEN,
	totalShards: parseInt(process.env.SHARDS_WANTED) || "auto",
	execArgv
});

// Shards events
const ShardHook = new Discord.WebhookClient({
	token: process.env.SHARDHOOK_TOKEN,
	id: "961008507166007296"
});

manager.on("shardCreate", (shard) => {
	console.log(`Launched shard ${shard.id}`);

	shard.on("ready", () => {
		console.log(`Shard ${shard.id} ready`);
		ShardHook.send(`Shard ${shard.id} ready 👍`);
	});

	shard.on("death", () => {
		console.log(`Shard ${shard.id} is death`);
		ShardHook.send(`Shard ${shard.id} is death 👻`);
	});
});
manager.spawn({ timeout: Infinity }).then(() => {
	webserver(manager);
});