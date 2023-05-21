import CartDAO from '../dao/Mongo/CartDAO.js'
const cartDAO = new CartDAO();
export default class CartService {
    constructor() {
    }


    getCartById = (id) => {
        return cartDAO.getCartById(id);
    }
}