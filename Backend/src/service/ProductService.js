import {createProductRepo, findAllProductsRepo, findProductByIdRepo} from '../Repository/ProductRepository.js'
import { findUser } from '../Repository/UserRepository.js';

// create products
export const createProductService=async(body,email)=>{
    try {
        const user=await findUser(email);

        // check that user is admin or user only
        if(user.role!='admin'){
            throw{message:"only admin have authority for creating products"}
        }

        // if user is admin then it can create the products
        const response=await createProductRepo(body);
        return response;
    } catch (error) {
        throw error;
    }
}

// find all products based on query
export const findAllProductsService=async(category,subcategory)=>{
    try {
        const response=await findAllProductsRepo(category,subcategory);
        return response;
    } catch (error) {
        throw error;
    }
}

// find product details by id
export const findProductByIdService=async(id)=>{
    try {
        const response=await findProductByIdRepo(id);
        return response;
    } catch (error) {
        throw error;
    }
}