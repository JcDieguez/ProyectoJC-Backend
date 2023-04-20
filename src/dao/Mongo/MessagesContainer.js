import  Message  from "../models/Message.js";
import fs from "fs";


export default class MessagesContainer {
  constructor(connection) {
    this.connection = connection;
  }

  getAll = () => {
    return messageModel.find();
  };

  getBy = (params) => {
    return messageModel.findOne(params);
  };

  save = async (message) => {
    try {
      const createData = await messageModel.create(message);
      return { success: true, data: createData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  update = async (id, updateData) => {
    try {
      const message = await messageModel.findById(id);
      if (!message) {
        return { success: false, error: "Message not found" };
      }
      message.text = updateData.text;
      await message.save();
      return { success: true, data: message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
}
