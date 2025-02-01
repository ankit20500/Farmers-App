import { getCartRepo } from "../Repository/CartRepository.js"

export const getCartService=async(userId)=>{
    try {
        const cart=await getCartRepo(userId);
        throw cart;
    } catch (error) {
        throw error;
    }
}