import mongoose from "mongoose";

const collection = 'Carts';

const schema = new mongoose.Schema({
    products:[
        {
            _id:{
                type: mongoose.SchemaTypes.ObjectId,
                ref:'Products'
            }
        }
    ]
})

const cartModel = mongoose.model(collection,schema);

export default cartModel;
