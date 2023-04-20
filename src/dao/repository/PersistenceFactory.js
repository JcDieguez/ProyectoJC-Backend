import UserRepository from "./UserRepository";
import ProductRepository from "./ProductRepository";

export default class PersistenceFactory {
  async getPersistenceInstance(persistence) {
    if (persistence === "MONGO") {
      return new UserRepository();
    } else if (persistence === "MEMORY") {
      return new ProductRepository();
    }
    throw new Error(`Unknown persistence: ${persistence}`);
  }
}

