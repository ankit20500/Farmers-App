import {Products} from '../Schema/Product.js';

export const createProductRepo=async(body)=>{
    try {
        const response=await Products.create({
            category:body.category,
            subcategories:body.subcategories.map(subcategory=>({
                name:subcategory.name,
                products:subcategory.products.map(product=>({
                    name:product.name,
                    description:product.description,
                    price:product.price,
                    image:product.image,
                    stock:product.stock,
                    reviews:product.reviews?.map(review=>({
                        user:review.user,
                        rating:review.rating,
                        comment:review.comment
                    })) || []  // if no review are provided then set empty array
                }))
            }))
        })
        return response;
    } catch (error) {
        throw error;
    }
}