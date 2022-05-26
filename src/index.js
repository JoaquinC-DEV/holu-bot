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

/* Logs */
import logging from './utils/logs.js';
const logs = new Discord.WebhookClient({
	id: "979410189843308614",
	token: process.env.LOGS_TOKEN
});

const time = new Date();
const logDate = `${time.getHours()}:${time.getMinutes()}, ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()} UTC`;

manager.on("shardCreate", (shard) => {
	let logMsg = `¡One shard launched! (${shard.id + 1}/${manager.totalShards})`;

	console.log(logMsg);
	logging(logMsg, {
		type: "correct",
		category: "shards"
	});
});