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

  async registerUser(username, password) {
    const existingUser = await userDAO.getBy(username);
    if (existingUser) {
      throw new Error('Username already taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    await userDAO.create(newUser);
    return newUser;
  }

  async getUserBy(username){
    await userDAO.getBy(username);
  }
}