import bcrypt from 'bcrypt';
import { MongoUserDAO } from '../dao/Mongo/MongoUserDAO';


const userDAO = new MongoUserDAO();
export default class UsersService {
  async authenticateUser(username, password) {
    const user = await userDAO.getUserByUsername(username);
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
    const existingUser = await userDAO.getUserByUsername(username);
    if (existingUser) {
      throw new Error('Username already taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    await userDAO.create(newUser);
    return newUser;
  }

 /* async getBy(field, value) {
    const user = await userDAO.findByField(field, value);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  
   async getUserByEmail(email) {
    const user = await userDAO.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  */
}
