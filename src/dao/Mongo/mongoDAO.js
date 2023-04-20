import mongoose from 'mongoose';
import User from '../models/User.js';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model('User', UserSchema);

export default class MongoUserDAO {
  async createUser(userDTO) {
    const newUser = new UserModel({
      name: userDTO.name,
      email: userDTO.email,
      password: userDTO.password,
    });

    await newUser.save();

    return newUser;
  }

  async getUserById(userId) {
    const user = await UserModel.findById(userId).exec();
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  }

  async updateUser(userId, userDTO) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        name: userDTO.name,
        email: userDTO.email,
        password: userDTO.password,
      },
      { new: true }
    ).exec();
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  }

  async deleteUser(userId) {
    const user = await UserModel.findByIdAndDelete(userId).exec();
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  }
}
