import mongoose from "mongoose";

const persistence = "MONGO";

export let usersService;

async function connectToMongoDB() {
  mongoose.set('strictQuery', false);
  const connection = await mongoose.connect("mongodb+srv://juancruz:123@proyectojc.12yzmzn.mongodb.net/proyectoJS?retryWrites=true&w=majority");
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