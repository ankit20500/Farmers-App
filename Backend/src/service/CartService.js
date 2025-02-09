import { getCartInfoRepo, getCartRepo } from "../Repository/CartRepository.js"
import { findProductByIdRepo } from "../Repository/ProductRepository.js";

// get cart items
export const getCartService=async(userId)=>{
    try {
        const cart=await getCartRepo(userId);
        return cart;
    } catch (error) {
        throw error;
    }
}

// add products in the cart
export const AddItemsService=async(userId,productdetails)=>{
    try {
        const cart=await getCartRepo(userId);
        const product=await findProductByIdRepo(productdetails.product);
        // find that the product which is added by the user is already added or not
        const existingItem=cart.items.find(item=>
            item.product._id.toString()===productdetails.product
        );
        if(existingItem){ // if product exist then increase the quantity
            // before increase the quantity check the stock of the product
            if(product.stock>existingItem.quantity){
                console.log("true");
                existingItem.quantity+=1; // existingItem.quantity=productdetails.quantity
            }
            else {
                console.log("false");
                throw {message:'product is out of stock'};
            }
        }else{
            cart.items.push({
                product:productdetails.product,
                quantity:1,                      //productdetails.quantity
            })
        }
        // save the cart in the databse
        await cart.save();
        product.stock-=1;
        await product.save();
        return cart;
    } catch (error) {
        throw error;
    }
}

// decrease the cart's quantity is any user will decrease the value of quantity
export const decreaseItemsToCartService=async(userId,productdetails)=>{
    try {
        const cart=await getCartRepo(userId);
        const product=await findProductByIdRepo(productdetails.product);
        cart.items.forEach(item=>{
            if(item.product._id.toString()===productdetails.product){
                item.quantity-=1;
            }
        })
        await cart.save();
        product.stock+=1;
        await product.save();
        return cart;
    } catch (error) {
        throw error;
    }
}

// delete the product if any user will delete any product of their cart
export const deleteCartProductService=async(userId,productdetails)=>{
    try {
        const cart=await getCartRepo(userId);
        const product=await findProductByIdRepo(productdetails.productId);
        cart.items=cart.items.filter(item=>item.product._id.toString()!=productdetails.productId);
        await cart.save();
        product.stock+=productdetails.quantity;
        await product.save();
        return cart;
    } catch (error) {
        throw error;
    }
}