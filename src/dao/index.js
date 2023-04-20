import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';
import MessageRepository from './repository/MessageRepository.js';
import ProductRepository from './repository/ProductRepository.js';
import UserRepository from './repository/UserRepository.js';

class DAOFactory {
  constructor() {
    this.persistenceTypes = {
      MONGO: 'mongo'
    };
  }

  async getDAO(persistenceType) {
    switch (persistenceType) {
      case this.persistenceTypes.MONGO:
        const client = await MongoClient.connect(process.env.MONGO_URI);
        const db = client.db(process.env.MONGO_DB_NAME);
        return {
          userDAO: new UserRepository(db),
          productDAO: new ProductRepository(db),
          messageDAO: new MessageRepository(db)
        };
      default:
        throw new Error(`Invalid persistence type: ${persistenceType}`);
    }
  }
}

const daoFactory = new DAOFactory();

let dao = null;

switch (process.env.PERSISTENCE_TYPE) {
  case 'mongo':
    dao = await daoFactory.getDAO('mongo');
    break;
  default:
    throw new Error(`Invalid persistence type: ${process.env.PERSISTENCE_TYPE}`);
}

export const userDAO = dao.userDAO;
export const productDAO = dao.productDAO;
export const messageDAO = dao.messageDAO;
