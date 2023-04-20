import UsersContainer from '../mongo/UsersContainer.js';

export default class UserRepository {
  constructor() {
    this.usersContainer = new UsersContainer();
  }

  async getAllUsers() {
    const users = await this.usersContainer.getAllUsers();
    return users;
  }

  async getUserById(id) {
    const user = await this.usersContainer.getUserById(id);
    return user;
  }

  async saveUser(user) {
    const createdUser = await this.usersContainer.saveUser(user);
    return createdUser;
  }

  async updateUser(id, user) {
    const updatedUser = await this.usersContainer.updateUser(id, user);
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await this.usersContainer.deleteUser(id);
    return deletedUser;
  }
}
