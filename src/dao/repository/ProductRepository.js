import { ProductsContainer } from "../mongo/ProductsContainer.js";
import  Product  from "../models/Product.js";


export default class ProductRepository {
  constructor(container) {
    this.container = container;
  }

  async getAll() {
    const products = await this.container.get();
    return products.map(product => new ProductDTO(product));
  }

  async getById(id) {
    const product = await this.container.getBy({ _id: id });
    return product ? new ProductDTO(product) : null;
  }

  async create(productDTO) {
    const productData = { ...productDTO };
    delete productData.id;
    const result = await this.container.save(productData);
    return new ProductDTO(result.data);
  }

  async update(id, productDTO) {
    const productData = { ...productDTO };
    delete productData.id;
    const result = await this.container.update(id, productData);
    return result.success ? new ProductDTO(result.data) : null;
  }

  async delete(id) {
    const result = await this.container.remove(id);
    return result.success;
  }
}
