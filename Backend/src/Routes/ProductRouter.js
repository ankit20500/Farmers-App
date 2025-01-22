import express from 'express';
import { createProductController } from '../Controller/ProductController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const productRoutes=express.Router();

productRoutes.post('/create',isLoggedIn ,createProductController);

export default productRoutes;