import ProductService from '../services/ProductService.js'

const productService = new ProductService();

const cargaProductos = async(req,res)=>{
    const file = req.file;
    const  {title,description,code,price,category} = req.body;
    if(!title||!description||!code||!price) return res.status(400).send({status:"error",error:"Incomplete values"});
    const product = {
        title,
        description,
        code,
        price,
        category,
        image:`${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
    }
    const result = await productService.cargaProductos(product)
    res.send({status:"success",payload:result})
}


export default {
    cargaProductos
}