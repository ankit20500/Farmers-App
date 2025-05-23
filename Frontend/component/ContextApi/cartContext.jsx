import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const cartContext=createContext();

export const CartProvider=({children})=>{

    // fetch the cart items 
    async function fetchCartItems(userId){
        try {
            // for production related request
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/cart",{userId},{
                withCredentials:true
            })

            // for localhost related request
            // const response=await axios.post("http://localhost:3000/cart",{userId},{
            //     withCredentials:true
            // })
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Add the items in the cart when user add the items in the cart
    async function AddItemsToCart(productDetails){
        try {
            // for production related request
            const cart=await axios.put("https://farmers-app-lxfi.onrender.com/cart/add/items",productDetails,{
                withCredentials:true
            })

            // for localhost request
            // const cart=await axios.put("http://localhost:3000/cart/add/items",productDetails,{
            //     withCredentials:true
            // })
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // decrease the items from cart if user will decrease the no. of products
    async function decreaseItemsToCart(productDetails){
        try {
            // for production related request
            const cart=await axios.put("https://farmers-app-lxfi.onrender.com/cart/decrease/items",productDetails,{
                withCredentials:true
            })

            // for localhost request 
            // const cart=await axios.put("http://localhost:3000/cart/decrease/items",productDetails,{
            //     withCredentials:true
            // })
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // delete the product from the cart 
    async function deleteCartProduct(productdetails){
        try {
            // for production
            const cart=await axios.delete("https://farmers-app-lxfi.onrender.com/cart/product/delete",{
                data:productdetails,
                withCredentials:true
            })

            // for localhost request
            // const cart=await axios.delete("http://localhost:3000/cart/product/delete",{
            //     data:productdetails,
            //     withCredentials:true
            // })
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