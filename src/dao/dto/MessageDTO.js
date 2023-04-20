export default class MessageDTO {
    constructor(id, text, sender, receiver, timestamp) {
      this.id = id;
      this.text = text;
      this.sender = sender;
      this.receiver = receiver;
      this.timestamp = timestamp;
    }
  }