import mongoose from 'mongoose';

const collection = 'Products';

const schema = new mongoose.Schema({
name: {
type: String,
required: true
},
description: String,
price: {
type: Number,
required: true,
min: 0
},
image: String,
stock: {
type: Number,
required: true,
min: 0
}
});

const productModel = mongoose.model(collection, schema);

export default productModel;