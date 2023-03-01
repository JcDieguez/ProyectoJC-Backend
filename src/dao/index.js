import mongoose from "mongoose";
import dotenv from "dotenv";

const persistence = "MONGO";

dotenv.config(); // carga las variables de entorno de .env

export let usersService;

async function connectToMongoDB() {
  mongoose.set('strictQuery', false);
  const connection = await mongoose.connect(process.env.MONGO_URI);
  return connection;
}

switch (persistence) {
  case 'MONGO':
    const { default: MongoUser } = await import('./Mongo/UsersContainer.js');
    usersService = new MongoUser(await connectToMongoDB());
    break;
  case 'FILESYSTEM':
    const { default: FSUser } = await import('./FileSystem/UsersContainer.js');
    usersService = new FSUser();
    break;
}