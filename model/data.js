import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({               // Or ObjectId if you want default Mongo IDs
  username: { type: String, required: true },
  points: { type: Number, default: 0 },
  avatar: { type: String }
});

const User = mongoose.model('User', userSchema);

export default User;
