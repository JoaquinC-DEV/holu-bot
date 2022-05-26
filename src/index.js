import 'dotenv/config.js';

import webserver from "./webserver.js";
import Discord from "discord.js-light";

const execArgv = ["--experimental-json-modules", "--expose-gc", "--optimize_for_size"];
const manager = new Discord.ShardingManager("./src/bot.js", {
	token: process.env.DISCORD_TOKEN,
	totalShards: parseInt(process.env.SHARDS_WANTED) || "auto",
	respawn: true,
	execArgv
});

manager.spawn({
	timeout: Infinity,
	delay: 500,
	amount: manager.totalShards
})
.then(() => {
	webserver(manager);
});

manager.on("shardCreate", (shard) => {
	console.log(`Launched shard ${shard.id + 1}/${manager.totalShards}`);
});