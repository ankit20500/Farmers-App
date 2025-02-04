import { createProductService, findAllProductsService, findProductByIdService, findProductsService } from "../service/ProductService.js"
import { errorHandler, successHandler } from "../Utility/Handler.js";

// create products
export const createProductController=async(req,res)=>{
    try {
        const {email}=req.user;
        const response=await createProductService(req.body,email);
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

// find product details by id
export const findProductByIdController=async(req,res)=>{
    try {
        const {id}=req.params;
        const response=await findProductByIdService(id);
        return successHandler(res,201,"product fetch successfully",response);
    } catch (error) {
        return errorHandler(res,404,"error found to fetch product details",error);
    }
}

// find products according to the user search
export const findProductsController=async(req,res)=>{
    try {
        const {query}=req.query;
        if(!query){
            return errorHandler(res,404,'search query is required');
        }
        const product=await findProductsService(query);
        return successHandler(res,201,"product fetch successfully",product);
    } catch (error) {
        return errorHandler(res,404,'something went wrong for fetching products',error);
    }
}