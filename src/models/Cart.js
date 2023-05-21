import mongoose from "mongoose";

const collection = 'Carts';

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    products: [
        {
            _id: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

const cartModel = mongoose.model(collection, schema);

export default cartModel;
