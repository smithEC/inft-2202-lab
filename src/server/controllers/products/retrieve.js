import ProductService from "../../service/ProductService.js";
import {checkSchema} from "express-validator";

export const rules = checkSchema({
    productId: {
        notEmpty:true,
        custom: {
            options:async (value)=>{
                if (!ProductService.retrieveProduct(value)){
                    throw new Error('that product doesnt exist')
                }
            }
        }
    }
});

const handle = async (req, res, next) => {
    console.log("Retrieve Controller Hit!"); 
    try {
        const {productId}= req.params;
            const product = await ProductService.retrieveProduct(productId);
            return res.json(product);
    } catch (err) {
        console.error("Error in Retrieve Controller:", err); 
        next(err);
    }

};

export default { handle, rules }