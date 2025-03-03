import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const productContext=createContext();

export const ProductProvider=({children})=>{
    const navigate=useNavigate();

    // fetch the product's data with category and subCategory
    async function fetchProduct(category,subCategory){
        try{
            const response=await axios.get(`https://farmers-app-lxfi.onrender.com/product/products?category=${category}&subcategory=${subCategory}`,{},{
                withCredentials:true
            });
            return response;
        }catch (error) {
            throw error;
        }
    }

    // fetch the product's data with id
    async function fetchProductById(id){
        try {
            const response=await axios.get(`https://farmers-app-lxfi.onrender.com/product/details/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    return(
        <productContext.Provider value={{fetchProduct,fetchProductById}}>
            {children}
        </productContext.Provider>
    )
}