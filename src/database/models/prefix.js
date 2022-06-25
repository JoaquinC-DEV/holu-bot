import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  guild_id: { type: String, required: true },
  prefix: { type: String, required: true, default: "h!" }
});

export default mongoose.model('prefix', schema);