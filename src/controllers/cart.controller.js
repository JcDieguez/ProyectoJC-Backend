import CartService from "../services/CartService.js";
import UserService from "../services/UserService.js";
import TicketService from "../services/TicketServices.js";
import HistoriesService from "../services/HistoriesService.js";
import {transporter} from "../services/MessageService.js";

import mongoose from 'mongoose';
import { makeid } from "../utils.js";
import { DateTime } from "luxon";


const { Types: { ObjectId } } = mongoose;
import ProductService from "../services/ProductService.js";

const cartService = new CartService();
const productService = new ProductService();
const ticketService = new TicketService();
const historiesService = new HistoriesService();


const insertProductToCart = async (req, res) => {
  const user = req.user;
  const productId = req.params.productId;
  const cart = await cartService.getCartById(user.cart._id,{populate:true});
  
  const exists = cart.products?.some((product) => product._id.toString() === productId);
  if (exists) {
    return res.status(400).send({ status: "error", error: "Product already exists" });
  }
  
  const product = await productService.getProductById(productId);
  
  if (!product) {
    return res.status(404).send({ status: "error", error: "Product not found" });
  }
  cart.products.push({_id:product._id});
  await cartService.updateCart(user.cart._id, { products: cart.products });
  res.redirect('/cart');
};

const purchase = async(req,res) =>{
  const cart = await cartService.getCartById(req.user.cart._id);
  const populatedCart = await cartService.getCartById(req.user.cart._id,{populate:true})
 
  const ticket = {
      user:req.user.id,
      products:cart.products,
      total:populatedCart.products.reduce((previous,current)=>previous+current._id.price,0),
      code: makeid(20)
  }
  await cartService.updateCart(cart._id,{products:[]});
  await ticketService.createTicket(ticket);
  let history = await historiesService.getHistoryBy({user:req.user.id});
  const event = {
      event:'Purchase',
      date: DateTime.now().toISO(),
      description:`Hizo una compra de ${populatedCart.products.length>1?"Multiples juegos":"un juego"}`
  }
  if(!history){
      await historiesService.createHistory({user:req.user.id,events:[event]})
  }else{
      history.events.push(event);
      await historiesService.updateHistory(history._id,{events:history.events})
  }
  let productosComprados='';
  for(let product of ticket.products){
    let porductBD = await productService.getProductById(product._id)
    productosComprados += `<div> <h3>${porductBD.title}</h3> <h4>precio: $ ${porductBD.price}</h4> </div>` 
};
   await transporter.sendMail({
    from: `Juan Cruz Dieguez eComerce <juancruzdieguez95@hotmail.com>`,
    to: ['juancruzdieguez95@hotmail.com', req.user.email],
    subject: `compra de ${req.user.name}`,
    html: `
    <div>
        <h1>Resumen de su compra: </h1>
        <p>Codigo de compra: <strong> ${ticket.code} </strong></p>
        <hr>
        <h3>Productos comprados:</h3>
        <br>
        <div>
            ${productosComprados}
        </div>
      <hr>
        <h3> Total: $${ticket.total} </h3>
    </div>
    `,
})
  res.send({status:"success",message:"Videojuegos agregados a la librería"});
  //llamar a nodemailer o servicio de mail de preferencia y enviar el ticket de compra.
}


export default {
  insertProductToCart,
  purchase
};

