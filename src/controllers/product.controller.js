import ProductService from '../services/ProductService.js'

const productService = new ProductService();

const cargaProductos = async(req,res)=>{
  const productId = req.id;
  
  const file = req.file;
  const  {id,fileAnterior, title,description,code,price,category} = req.body;
  if(!title||!description||!code||!price) return res.status(400).send({status:"error",error:"Incomplete values"});
  
  let result;
  if(id != ""){
    const product = {
      id,
      title,
      description,
      code,
      price,
      category,
      image: file != undefined ?`${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file?.filename}` : fileAnterior
    }
    console.log(product.image)
     result = await productService.updateProduct(product)
    }else{
      const product = {
        title,
        description,
        code,
        price,
        category,
        image:`${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file?.filename}`
      }
       result = await productService.cargaProductos(product)
    }
    res.send({status:"success",payload:result})
}


}

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const result = await productService.eliminarProducto(productId);
    res.send({ status: "success", message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", error: "Failed to delete product" });
  }
};

export default {
  cargaProductos,
  deleteProduct
};
