import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const cartContext=createContext();

export const CartProvider=({children})=>{
    const navigate=useNavigate();

    // fetch the cart items 
    async function fetchCartItems(userId){
        try {
            const response=await axios.post("http://localhost:3000/cart",{userId},{
                withCredentials:true
            })
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Add the items in the cart when user add the items in the cart
    async function AddItemsToCart(productDetails){
        try {
            const cart=await axios.put("http://localhost:3000/cart/add/items",productDetails,{
                withCredentials:true
            })
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // delete the product from the cart 
    async function deleteCartProduct(productId){
        try {
            const cart=await axios.delete(`http://localhost:3000/cart/product/${productId}`,{
                withCredentials:true
            })
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <cartContext.Provider value={{fetchCartItems,AddItemsToCart,deleteCartProduct}}>
            {children}
        </cartContext.Provider>
    )
}