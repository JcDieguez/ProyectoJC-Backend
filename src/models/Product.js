import mongoose from 'mongoose';
import mongoosePagination  from 'mongoose-paginate-v2';

const collection = 'Products';

const schema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    category:String,
    code:{
        type:String,
        unique:true
    },
    image:String
})
schema.plugin(mongoosePagination);

const productModel  = mongoose.model(collection,schema);

export default productModel;