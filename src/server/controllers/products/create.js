import {checkSchema} from "express-validator";
//import ProdcutService from "../../service/ProdcutService.js";
import ProductService from "../../service/ProductService.js";

const rules = checkSchema({
    name: {
        notEmpty: true,
        errorMessage: `"name" is required`,
        in: 'body'
    },
    price:{
        notEmpty: {
            errorMessage: `"price" must not be empty`
        },
        isNumeric:{
            errorMessage: `"price" must be a number`
        },
        in: 'body'
    },
    stock:{
        notEmpty: {
            errorMessage: `"stock" must not be empty`
        },
        isNumeric:{
            errorMessage: `"stock" must be a number`
        },
        in: 'body'
    },
    description:{
        notEmpty: {
            errorMessage: `"description" must not be empty`
        },
        in: 'body'
    },
});

const handle = async (req, res, next) => {
    console.log('Incoming POST Request:', req.body); 
    try{
    const {name,price,stock,description} = req.body;
    const product = await ProductService.createProduct({name,price,stock,description });
    res.json(product);
    }catch (err) {
        console.error('Error in Create Controller:', err);
        next(err)
    }
}
export default { handle, rules}

