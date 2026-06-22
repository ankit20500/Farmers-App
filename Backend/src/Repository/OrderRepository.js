import { Order } from "../Schema/Order.js";
import { Transaction } from "../Schema/Transaction.js";

export const createOrderRepo = async (orderData) => {
    try {
        const order = await Order.create(orderData);
        // Populate items.product immediately
        return await Order.findById(order._id).populate("items.product");
    } catch (error) {
        throw error;
    }
}

export const getOrdersByUserRepo = async (userId) => {
    try {
        return await Order.find({ user: userId })
            .populate("items.product")
            .sort({ createdAt: -1 });
    } catch (error) {
        throw error;
    }
}

export const getOrderByIdRepo = async (orderId) => {
    try {
        return await Order.findById(orderId).populate("items.product");
    } catch (error) {
        throw error;
    }
}

export const createTransactionRepo = async (transactionData) => {
    try {
        return await Transaction.create(transactionData);
    } catch (error) {
        throw error;
    }
}
