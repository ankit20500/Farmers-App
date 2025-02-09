import express from 'express';
import { AddItemsController, decreaseItemsToCartController, deleteCartProductController, getCartController } from '../Controller/CartController.js';
import { isLoggedIn } from '../validator/authValidator.js';
const cartRoutes=express.Router();

cartRoutes.post("/",getCartController);
cartRoutes.put('/add/items',isLoggedIn,AddItemsController);
cartRoutes.put('/decrease/items',isLoggedIn,decreaseItemsToCartController);
cartRoutes.delete('/product/delete',isLoggedIn,deleteCartProductController);

export default cartRoutes;