import { UserModel } from '../models/User.js';

export default class UsersContainer {
  constructor() {
    this.UserModel = UserModel;
  }

  async getAllUsers() {
    const users = await this.UserModel.find({});
    return users;
  }

  async getUserById(id) {
    const user = await this.UserModel.findById(id);
    return user;
  }

  async saveUser(user) {
    const createdUser = await this.UserModel.create(user);
    return createdUser;
  }

  async updateUser(id, user) {
    const updatedUser = await this.UserModel.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true }
    );
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await this.UserModel.findByIdAndDelete(id);
    return deletedUser;
  }
}
