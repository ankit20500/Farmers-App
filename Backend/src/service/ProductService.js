import {createProductRepo, findAllProductsRepo, findProductByIdRepo, findProductsRepo} from '../Repository/ProductRepository.js'
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

// find products according to searching
export const findProductsService=async(input)=>{
    try {
        const products=await findProductsRepo(input);
        return products;
    } catch (error) {
        throw error;
    }
}

// create the review for any product
export const writeReviewService=async(userId,comment,rating,productId)=>{
    try {
        const product=await findProductByIdRepo(productId);
        const review=product.reviews.find((user)=>user.user._id.toString()===userId);
        if(review){  // if review is already present then replace the comment and rating
            review.comment=comment;
            review.rating=rating;
        }else{  // add the new review directly into the product reviews array
            product.reviews.push({user:userId,comment,rating});
        }

        // update the totalRating of the product
        const totalRating=product.reviews.reduce((sum,curr)=>sum+curr.rating,0);
        product.ratings=totalRating/product.reviews.length;
        // save the product
        await product.save();
        return product;
    } catch (error) {
        throw error;
    }
}