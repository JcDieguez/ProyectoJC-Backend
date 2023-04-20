import  MessagesContainer  from "../mongo/MessagesContainer.js";
import  Message  from "../models/Message.js";


class MessageRepository {
  constructor() {
    this.messageDAO = new MessagesContainer();
  }

  async getAll() {
    const messages = await this.messageDAO.get();
    return messages.map((m) => new MessageDTO(m));
  }

  async getById(id) {
    const message = await this.messageDAO.getBy({ _id: id });
    return message ? new MessageDTO(message) : null;
  }

  async create(message) {
    const result = await this.messageDAO.save(message);
    return result.success ? new MessageDTO(result.data) : null;
  }

  async update(id, message) {
    const result = await this.messageDAO.update(id, message);
    return result.success ? new MessageDTO(result.data) : null;
  }

  async delete(id) {
    const message = await this.getById(id);
    if (!message) return false;
    const result = await this.messageDAO.delete(id);
    return result.success;
  }
}

export default MessageRepository;
