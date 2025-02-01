import { getCartService } from "../service/CartService.js"
import { errorHandler, successHandler } from "../Utility/Handler.js";

export const getCartController=async(req,res)=>{
    try {
        const cart=await getCartService(req.body.userId);
        return successHandler(res,200,"successfully found your cart Items",cart);
    } catch (error) {
        console.log(error);
        return errorHandler(res,404,'not found your cart',error);
    }
}