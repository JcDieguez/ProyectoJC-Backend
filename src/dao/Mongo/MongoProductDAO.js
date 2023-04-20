import { Product } from "../models/Product.js";

// DAO para la persistencia de productos en MongoDB
export class MongoProductDAO {
  constructor(productsContainer) {
    this.products = productsContainer;
  }

  async addProduct(productDTO) {
    const product = new Product(productDTO);
    const result = await this.products.insertOne(product);
    return result.insertedId ? product : null;
  }

  async getAllProducts() {
    const cursor = await this.products.find({});
    const products = await cursor.toArray();
    return products;
  }

  async getProductById(productId) {
    const product = await this.products.findOne({ _id: productId });
    return product ? new Product(product) : null;
  }

  async updateProduct(productId, productDTO) {
    const updatedProduct = new Product(productDTO);
    const result = await this.products.replaceOne({ _id: productId }, updatedProduct);
    return result.modifiedCount === 1 ? updatedProduct : null;
  }

  async deleteProduct(productId) {
    const result = await this.products.deleteOne({ _id: productId });
    return result.deletedCount === 1;
  }
}
