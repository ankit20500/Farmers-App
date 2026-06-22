import { 
    computeCheckoutSummary, 
    createOrderService, 
    getUserOrdersService, 
    getOrderByIdService 
} from "../service/OrderService.js";
import { errorHandler, successHandler } from "../Utility/Handler.js";

export const getCheckoutSummaryController = async (req, res) => {
    try {
        const userId = req.user.id;
        const summary = await computeCheckoutSummary(userId);
        return successHandler(res, 200, "Checkout summary calculated successfully", summary);
    } catch (error) {
        return errorHandler(res, 500, error.message, error);
    }
}

export const createOrderController = async (req, res) => {
    try {
        const userId = req.user.id;
        const order = await createOrderService(userId, req.body);
        
        // If simulated payment failed, return status 402 Payment Required but send order record
        if (order.paymentStatus === 'Failed') {
            return res.status(402).json({
                success: false,
                message: "Payment transaction simulation failed",
                data: order,
                error: { message: "Declined card or failed UPI request" }
            });
        }
        
        return successHandler(res, 201, "Order placed successfully", order);
    } catch (error) {
        return errorHandler(res, 400, error.message, error);
    }
}

export const getUserOrdersController = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await getUserOrdersService(userId);
        return successHandler(res, 200, "User orders fetched successfully", orders);
    } catch (error) {
        return errorHandler(res, 500, error.message, error);
    }
}

export const getOrderByIdController = async (req, res) => {
    try {
        const order = await getOrderByIdService(req.params.id);
        if (!order) {
            return errorHandler(res, 404, "Order not found", {});
        }
        return successHandler(res, 200, "Order details fetched successfully", order);
    } catch (error) {
        return errorHandler(res, 500, error.message, error);
    }
}
