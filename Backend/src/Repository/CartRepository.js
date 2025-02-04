import mongoose from 'mongoose';
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

// get cart details for any user's with product details
export const getCartRepo=async(userId)=>{
    try {
        const cart=await Cart.findOne({user:userId}).populate("items.product");
        return cart;
    } catch (error) {
        throw error;
    }
}

// get cart details for any user's without product details 
export const getCartInfoRepo=async(userId)=>{
    try {
        const cart=await Cart.findOne({user:userId});
        return cart;
    } catch (error) {
        throw error;
    }
}

// delete cart when any user will delete their account
export const deleteCartRepo=async(userId)=>{
    try {
        const objectId = new mongoose.Types.ObjectId(userId);

        // Delete the cart where the user field matches userId
        const cart = await Cart.deleteOne({ user: objectId });
        return cart;
    } catch (error) {
        throw error;
    }
}
