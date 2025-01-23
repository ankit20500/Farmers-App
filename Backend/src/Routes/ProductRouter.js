import express from 'express';
import { createProductController, findAllProductsController } from '../Controller/ProductController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const productRoutes=express.Router();

productRoutes.post('/create',isLoggedIn ,createProductController);
productRoutes.get('/products',findAllProductsController);

export default productRoutes;