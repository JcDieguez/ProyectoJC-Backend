import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: 'user',
  },
  avatar: {
    type: String,
    default: null,
  },
});

export const UserModel = mongoose.model('User', userSchema);