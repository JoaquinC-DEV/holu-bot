import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
});
export default mongoose.model('Profile', ProfileSchema);