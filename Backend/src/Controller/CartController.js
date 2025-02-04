import { AddItemsService, deleteCartProductService, getCartService } from "../service/CartService.js"
import { errorHandler, successHandler } from "../Utility/Handler.js";

// fetch the cart items
export const getCartController=async(req,res)=>{
    try {
        const cart=await getCartService(req.body.userId);
        return successHandler(res,200,"successfully found your cart Items",cart);
    } catch (error) {
        console.log(error);
        return errorHandler(res,404,'not found your cart',error);
    }
}

// add the items in the cart
export const AddItemsController=async(req,res)=>{
    try {
        const {id}=req.user;
        const productdetails=req.body;
        const response=await AddItemsService(id,productdetails);
        return successHandler(res,201,'items add successfully',response);
    } catch (error) {
        return errorHandler(res,404,'something went wrong',error);
    }
}

// delete any product in the cart
export const deleteCartProductController=async(req,res)=>{
    try {
        const {id}=req.params;
        const userId=req.user.id;
        const response=await deleteCartProductService(userId,id);
        return successHandler(res,201,'item delete successfully',response);
    } catch (error) {
        return errorHandler(res,404,error.message,error);
    }
}