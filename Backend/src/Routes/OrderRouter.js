import express from 'express';
import { 
    getCheckoutSummaryController, 
    createOrderController, 
    getUserOrdersController, 
    getOrderByIdController 
} from '../Controller/OrderController.js';
import { isLoggedIn } from '../validator/authValidator.js';

const orderRouter = express.Router();

orderRouter.get("/summary", isLoggedIn, getCheckoutSummaryController);
orderRouter.post("/", isLoggedIn, createOrderController);
orderRouter.get("/user", isLoggedIn, getUserOrdersController);
orderRouter.get("/:id", isLoggedIn, getOrderByIdController);

export default orderRouter;
