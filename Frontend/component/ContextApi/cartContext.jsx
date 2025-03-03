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
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/cart",{userId},{
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
            const cart=await axios.put("https://farmers-app-lxfi.onrender.com/cart/add/items",productDetails,{
                withCredentials:true
            })
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // decrease the items from cart if user will decrease the no. of products
    async function decreaseItemsToCart(productDetails){
        try {
            const cart=await axios.put("https://farmers-app-lxfi.onrender.com/cart/decrease/items",productDetails,{
                withCredentials:true
            })
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // delete the product from the cart 
    async function deleteCartProduct(productdetails){
        try {
            const cart=await axios.delete("https://farmers-app-lxfi.onrender.com/cart/product/delete",{
                data:productdetails,
                withCredentials:true
            })
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <cartContext.Provider value={{fetchCartItems,AddItemsToCart,decreaseItemsToCart,deleteCartProduct}}>
            {children}
        </cartContext.Provider>
    )
}