import express from 'express';
import { AddItemsController, deleteCartProductController, getCartController } from '../Controller/CartController.js';
import { isLoggedIn } from '../validator/authValidator.js';
const cartRoutes=express.Router();

cartRoutes.post("/",getCartController);
cartRoutes.put('/add/items',isLoggedIn,AddItemsController);
cartRoutes.delete('/product/:id',isLoggedIn,deleteCartProductController);

export default cartRoutes;