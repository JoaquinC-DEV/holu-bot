import 'dotenv/config.js';

import webserver from "./webserver.js";
import Discord from "discord.js-light";

const execArgv = ["--experimental-json-modules", "--expose-gc", "--optimize_for_size"];
const manager = new Discord.ShardingManager("./src/bot.js", {
	token: process.env.DISCORD_TOKEN,
	totalShards: parseInt(process.env.SHARDS_WANTED) || "auto",
	execArgv
});

manager.on("shardCreate", (shard) => {
	console.log(`Launched shard ${shard.id}`);

	shard.on("ready", () => {
		console.log(`Shard ${shard.id} ready`);
	});

	shard.on("death", () => {
		console.log(`Shard ${shard.id} is death`);
	});
});
manager.spawn({ timeout: Infinity }).then(() => {
	webserver(manager);
});