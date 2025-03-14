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
        const response=await Products.find({category,subcategory});
        return response;
    } catch (error) {
        throw error;
    }
}

// find product details by id
export const findProductByIdRepo=async(id)=>{
    try {
        const response=await Products.findOne({_id:id})
                            .populate("reviews.user","name");
        return response;
    } catch (error) {
        throw error;
    }
}

// find products when user search anything
export const findProductsRepo=async(input)=>{
    try {
        const response=await Products.find({
            $or:[
                {productname:{$regex:input,$options:'i'}},
                {category:{$regex:input,$options:'i'}},
                {subcategory:{$regex:input,$options:'i'}}
            ]
        });
        return response;
    } catch (error) {
        throw error;
    }
}
