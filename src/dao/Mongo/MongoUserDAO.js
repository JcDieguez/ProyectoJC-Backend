import { MongoClient } from 'mongodb';

export class MongoUserDAO {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.dbName = process.env.MONGODB_DBNAME;
  }

  async getUserByUsername(username) {
    await this.client.connect();
    const collection = this.client.db(this.dbName).collection('users');
    const user = await collection.findOne({ username });
    return user;
  }

  async addUser(user) {
    await this.client.connect();
    const collection = this.client.db(this.dbName).collection('users');
    await collection.insertOne(user);
  }
}
