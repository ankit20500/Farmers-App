import {Cart} from '../Schema/Cart.js';

// create cart
export const createCartRepo=async(userId)=>{
    try {
        const newCart=await Cart.create({
            user:userId
        })
        return newCart;
    } catch (error) {
        throw error;
    }
}

// get cart details for any user's
export const getCartRepo=async(userId)=>{
    try {
        const cart=await Cart.findOne({user:userId}); 
        return cart;
    } catch (error) {
        throw error;
    }
}