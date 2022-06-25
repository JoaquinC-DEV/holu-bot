import profile from "./database/models/profile.js";
import prefix from "./database/models/prefix.js";

//To differentiate user errors
class StructureError extends Error {
    constructor(error) {
        super();
        this.name = "StructureError";
        this.message = error;
    }
}

export async function setDescription(user, description) {
    const userProfile = await profile.findOneAndUpdate({ user_id: user.id }, { profile_description: description });

    if (userProfile) {
        return true
    } else {
        return false
    }
}

export async function getPrefix(guild) {
    if (guild.prefix && guild.cache?.prefix) return guild.prefix;
    const doc = await prefix.findOne({ guild_id: guild.id }).lean();
    if (doc) {
        guild.prefix = doc.prefix;
        if (!guild.cache) guild.cache = {};
        guild.cache.prefix = true;
        return doc.prefix;
    } else {
        guild.prefix = "h!";
        if (!guild.cache) guild.cache = {};
        guild.cache.prefix = true;
        return "h!";
    }
}

export async function setPrefix(guild, newPrefix) {
    const doc = await prefix.findOneAndUpdate({ guild_id: guild.id }, { prefix: newPrefix }).lean();
    if (doc) {
        guild.prefix = newPrefix;
        if (!guild.cache) guild.cache = {};
        guild.cache.prefix = true;
        return newPrefix;
    } else {
        await prefix.create({
            guild_id: guild.id,
            prefix: newPrefix,
        });
        guild.prefix = newPrefix;
        if (!guild.cache) guild.cache = {};
        guild.cache.prefix = true;
        return newPrefix;
    }
}