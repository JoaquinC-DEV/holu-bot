import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  profile_description: { type: String, required: true },
  profile_createdAt: { type: Date, required: true },
  profile_xp: { type: Number, required: true, default: 10 },
  profile_lvl: { type: Number, required: true, default: 1 },
  profile_friends: [{
    friendId: { type: String, required: true },
    friendSince: { type: Date, required: true }
  }],
  profile_money: {
    coins: { type: Number, required: true, default: 100 },
    diamonds: { type: Number, required: true, default: 0 }
  },
  profile_badges: [{
    type: String, required: true
  }],
  profile_premium: { type: Boolean, required: true, default: false }
});

export default mongoose.model('Profile', ProfileSchema);