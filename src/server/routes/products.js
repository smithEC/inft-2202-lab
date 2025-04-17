import express from 'express';
import Product from "../models/Product.js";
import { CheckValidation } from '../middleware/validation.js';
import ProductCreateController from "../controllers/products/create.js";
import ProductRetrieveController from "../controllers/products/retrieve.js";
import ProductUpdateController from "../controllers/products/update.js";
import ProductDeleteController from "../controllers/products/delete.js";
import ProductSearchController from "../controllers/products/search.js";
const router = express.Router();

router.get('/products',ProductSearchController.handle);

router.get('/products/:productId',ProductRetrieveController.handle);

router.post('/products',CheckValidation(ProductCreateController.rules), ProductCreateController.handle);

router.put('/products/:productId',CheckValidation(ProductUpdateController.rules), ProductUpdateController.handle);

router.delete('/products/:productId',CheckValidation(ProductDeleteController.rules), ProductDeleteController.handle);

export default router;