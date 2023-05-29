import bcrypt from 'bcrypt';
import TicketDAO from '../dao/Mongo/TicketDAO.js'


const ticketDAO = new TicketDAO();
export default class TicketService {
  async createTicket(ticket) {
    ticketDAO.createTicket(ticket);
  }

}