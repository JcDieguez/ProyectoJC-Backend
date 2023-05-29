import TicketModel from '../../models/Ticket.js';


export default class TicketDAO {


    createTicket = (ticket) =>{
        return TicketModel.create(ticket);
    }

}