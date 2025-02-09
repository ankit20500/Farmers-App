import { AddItemsService, decreaseItemsToCartService, deleteCartProductService, getCartService } from "../service/CartService.js"
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

// decrease the cart items if user decrease from the cart
export const decreaseItemsToCartController=async(req,res)=>{
    try {
        const {id}=req.user;
        const productdetails=req.body;
        const response=await decreaseItemsToCartService(id,productdetails);
        return successHandler(res,201,'items decrease successfully',response);
    } catch (error) {
        return errorHandler(res,404,'something went wrong',error);
    }
}

// delete any product in the cart
export const deleteCartProductController=async(req,res)=>{
    try {
        const productdetails=req.body;
        const userId=req.user.id;
        const response=await deleteCartProductService(userId,productdetails);
        return successHandler(res,201,'item delete successfully',response);
    } catch (error) {
        return errorHandler(res,404,error.message,error);
    }
}