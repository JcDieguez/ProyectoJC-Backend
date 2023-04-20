import mongoose from "mongoose";
import product from "../models/Product.js"

export class ProductsContainer {
  constructor(connection) {
    this.productModel = connection.model("Product", ProductSchema);
  }

  async get() {
    return this.productModel.find();
  }

  async getById(id) {
    return this.productModel.findById(id);
  }

  async save(productDTO) {
    const product = new this.productModel(productDTO);
    try {
      await product.save();
      return { success: true, data: product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async update(id, productDTO) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        return { success: false, error: "Product not found" };
      }
      product.name = productDTO.name;
      product.description = productDTO.description;
      product.price = productDTO.price;
      product.quantity = productDTO.quantity;
      await product.save();
      return { success: true, data: product };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delete(id) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        return { success: false, error: "Product not found" };
      }
      await product.delete();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export class MongoProductDAO {
  constructor(connection) {
    this.productsContainer = new ProductsContainer(connection);
  }

  async getProducts() {
    return this.productsContainer.get();
  }

  async getProductById(id) {
    return this.productsContainer.getById(id);
  }

  async createProduct(productDTO) {
    return this.productsContainer.save(productDTO);
  }

  async updateProduct(id, productDTO) {
    return this.productsContainer.update(id, productDTO);
  }

  async deleteProduct(id) {
    return this.productsContainer.delete(id);
  }
}

export class ProductDAOFactory {
  constructor() {
    this.instances = {};
  }

  async getDAOInstance() {
    const persistence = "MONGO"; // obtener de variable de entorno
    if (!this.instances[persistence]) {
      const connection = await mongoose.connect(process.env.MONGO_URI);
      this.instances[persistence] = new MongoProductDAO(connection);
    }
    return this.instances[persistence];
  }
}
