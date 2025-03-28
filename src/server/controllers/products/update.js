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
    },
    name: {
        optional: true,
        notEmpty: {
            errorMessage: `"name" must not be empty`
        }
    },
    price: {
        optional: true,
        isNumeric: {
            errorMessage: `"price" must be a number`
        }
    },
    stock: {
        optional: true,
        isNumeric: {
            errorMessage: `"stock" must be a number`
        }
    },
    description: {
        optional: true,
        notEmpty: {
            errorMessage: `"description" must not be empty`
        }
    }
});

const handle = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const updatedProduct = await ProductService.updateProduct(productId, updateData);
        res.json(updatedProduct);
    } catch (err) {
        next(err);
    }
};

export default { handle, rules }
