import { getCartInfoRepo, getCartRepo } from "../Repository/CartRepository.js"

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
        
        // find that the product which is added by the user is already added or not
        const existingItem=cart.items.find(item=>
            item.product._id.toString()===productdetails.product
        );
        if(existingItem){ // if product exist then increase the quantity
            existingItem.quantity=productdetails.quantity;
        }else{
            cart.items.push({
                product:productdetails.product,
                quantity:productdetails.quantity
            })
        }
        await cart.save();
        return cart;
    } catch (error) {
        throw error;
    }
}

// delete the product if any user will delete any product of their cart
export const deleteCartProductService=async(userId,productId)=>{
    try {
        const cart=await getCartInfoRepo(userId);
        cart.items=cart.items.filter(product=>product.product!=productId);
        await cart.save();
        return cart;
    } catch (error) {
        throw error;
    }
}