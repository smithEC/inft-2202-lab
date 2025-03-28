import ProductService from "../../service/ProductService.js";

const handle = async (req,res,next) => {
   try{
    const {page , perPage}= req.query
    const body = await ProductService.searchProducts(page,perPage)
    res.json(body);
    }catch(error){
        next(error);
    }

}

export default {handle};