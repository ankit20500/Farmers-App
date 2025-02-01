import express from 'express';
import { getCartController } from '../Controller/CartController.js';
const cartRoutes=express.Router();

cartRoutes.get("/",getCartController);

export default cartRoutes;