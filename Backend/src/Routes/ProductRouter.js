import express from 'express';
import { createProductController, findAllProductsController, findProductByIdController, findProductsController, writeReviewController } from '../Controller/ProductController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const productRoutes=express.Router();

productRoutes.post('/create',isLoggedIn ,createProductController);
productRoutes.get('/products',findAllProductsController);
productRoutes.get('/details/:id',findProductByIdController);
productRoutes.get('/',findProductsController);
productRoutes.post('/create/review',isLoggedIn,writeReviewController);

export default productRoutes;