import { createProductService, findAllProductsService } from "../service/ProductService.js"
import { errorHandler, successHandler } from "../Utility/Handler.js";

// create products
export const createProductController=async(req,res)=>{
    try {
        const response=await createProductService(req.body,res);
        return successHandler(res,201,"product created successfully",response);
    } catch (error) {
        return errorHandler(res,404,error.message,error);
    }
}

// find all products based on query
export const findAllProductsController=async(req,res)=>{
    try {
        const {category,subcategory} = req.query;
        const response=await findAllProductsService(category,subcategory);
        return successHandler(res,201,"Here is all products",response);
    } catch (error) {
        return errorHandler(res,404,error.message,error);
    }
}

