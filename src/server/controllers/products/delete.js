import ProductService from "../../service/ProductService.js";
import {checkSchema} from "express-validator";

export const rules = checkSchema({
    productId: {
        in: ['params'],
        isMongoId: {
            errorMessage: `"productId" must be a valid MongoDB ObjectId`
        },
        notEmpty: {
            errorMessage: `"productId" is required`
        }
    }
});



const handle = async (req, res, next) => {
    try {
        const {productId} = req.params;
        const deletedProduct = await ProductService.deleteProduct(productId);
        res.json(deletedProduct);
    } catch (err) {
        next(err);
    }
};

export default { handle, rules }