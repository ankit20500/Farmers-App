import {Products} from '../Schema/Product.js';

// create products
export const createProductRepo = async (body) => {
    try {
        let response;
        // is body is array then createmany products
        if(Array.isArray(body)){
            response=await Products.insertMany(body);
        }
        // else create only one product
        else {
            response=await Products.create(body);
        }
        return response;
    } catch (error) {
        throw error;
    }
};

// find all the products according to the query arrise
export const findAllProductsRepo=async(category,subcategory)=>{
    try {
        // console.log(query);
        const response=await Products.find({category,subcategory});
        return response;
    } catch (error) {
        throw error;
    }
}

// find product details by id
export const findProductByIdRepo=async(id)=>{
    try {
        const response=await Products.find({_id:id});
        return response;
    } catch (error) {
        throw error;
    }
}