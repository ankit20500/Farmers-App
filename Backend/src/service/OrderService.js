import { getCartRepo } from "../Repository/CartRepository.js";
import { 
    createOrderRepo, 
    getOrdersByUserRepo, 
    getOrderByIdRepo, 
    createTransactionRepo 
} from "../Repository/OrderRepository.js";
import { User } from "../Schema/User.js";
import { Products } from "../Schema/Product.js";

export const computeCheckoutSummary = async (userId) => {
    try {
        const cart = await getCartRepo(userId);
        if (!cart || cart.items.length === 0) {
            return {
                subTotal: 0,
                shippingCharge: 0,
                tax: 0,
                discount: 0,
                grandTotal: 0,
                itemsCount: 0
            };
        }

        let subTotal = 0;
        let itemsCount = 0;
        for (const item of cart.items) {
            subTotal += parseFloat(item.product.price) * item.quantity;
            itemsCount += item.quantity;
        }

        const shippingCharge = subTotal > 500 ? 0 : 40; // Free shipping over 500
        const tax = Math.round(subTotal * 0.05); // 5% tax
        const discount = 0; // Flat discount
        const grandTotal = subTotal + shippingCharge + tax - discount;

        return {
            subTotal,
            shippingCharge,
            tax,
            discount,
            grandTotal,
            itemsCount
        };
    } catch (error) {
        throw error;
    }
}

export const createOrderService = async (userId, orderData) => {
    try {
        const { addressId, paymentMethod, simulateStatus } = orderData; // simulateStatus: 'success' | 'failure'
        
        // 1. Get cart
        const cart = await getCartRepo(userId);
        if (!cart || cart.items.length === 0) {
            throw new Error("Cannot place order with an empty cart");
        }

        // 2. Find address from user's saved addresses
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");
        
        const addressDoc = user.addresses.id(addressId);
        if (!addressDoc) throw new Error("Shipping address not found");

        const addressSnapshot = {
            fullName: addressDoc.fullName,
            phoneNumber: addressDoc.phoneNumber,
            email: addressDoc.email,
            country: addressDoc.country,
            state: addressDoc.state,
            city: addressDoc.city,
            postalCode: addressDoc.postalCode,
            fullAddress: addressDoc.fullAddress,
            landmark: addressDoc.landmark
        };

        // 3. Server-side totals calculation
        const summary = await computeCheckoutSummary(userId);

        // 4. Validate stock for items
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product: ${item.product.productname}`);
            }
        }

        // 5. Payment details
        const isPaid = simulateStatus === 'success';
        const transactionId = `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const orderFields = {
            user: userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            totalPrice: summary.grandTotal,
            status: isPaid ? 'Confirmed' : 'Pending',
            addressSnapshot,
            paymentMethod,
            paymentStatus: isPaid ? 'Paid' : 'Failed',
            paymentDetails: {
                transactionId,
                paymentMethod,
                paymentStatus: isPaid ? 'Paid' : 'Failed',
                timestamp: new Date()
            }
        };

        // 6. Create Order
        const order = await createOrderRepo(orderFields);

        // 7. Log Transaction
        await createTransactionRepo({
            user: userId,
            order: order._id,
            amount: summary.grandTotal,
            paymentMethod,
            paymentStatus: isPaid ? 'Paid' : 'Failed',
            transactionId
        });

        if (isPaid) {
            // 8. Reduce product stock in database
            for (const item of cart.items) {
                await Products.findByIdAndUpdate(item.product._id, {
                    $inc: { stock: -item.quantity }
                });
            }

            // 9. Clear User's Cart
            cart.items = [];
            await cart.save();
        }

        return order;
    } catch (error) {
        throw error;
    }
}

export const getUserOrdersService = async (userId) => {
    try {
        return await getOrdersByUserRepo(userId);
    } catch (error) {
        throw error;
    }
}

export const getOrderByIdService = async (orderId) => {
    try {
        return await getOrderByIdRepo(orderId);
    } catch (error) {
        throw error;
    }
}
