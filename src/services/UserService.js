import bcrypt from 'bcrypt';
import UserDAO from '../dao/Mongo/UserDAO.js'


const userDAO = new UserDAO();
export default class UsersService {

  async authenticateUser(username, password) {
    const user = await userDAO.getBy(username);
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

  async save(user){
   await userDAO.save(user);
  }

  async getUserBy(username){
    await userDAO.getBy(username);
  }
}