import { createContext } from "react";
import axios from "axios";

export const productContext=createContext();

export const ProductProvider=({children})=>{

    // fetch the product's data with category and subCategory
    async function fetchProduct(category,subCategory){
        try{
            // for production related request
            const response=await axios.get(`https://farmers-app-lxfi.onrender.com/product/products?category=pesticides&subcategory=herbicides`,{},{
                withCredentials:true
            });

            // for localhost request
            // const response=await axios.get(`http://localhost:3000/product/products?category=${category}&subcategory=${subCategory}`,{},{
            //     withCredentials:true
            // });
            return response;
        }catch (error) {
            console.log("error",error);
            throw error;
        }
    }

    // fetch the product's data with id
    async function fetchProductById(id){
        try {
            // for production related request
            const response=await axios.get(`https://farmers-app-lxfi.onrender.com/product/details/${id}`);

            // for localhost request
            //const response=await axios.get(`http://localhost:3000/product/details/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // writing the review of the product
    async function writeProductReview(obj){
        try {
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/product/create/review",obj,{
                withCredentials:true
              });
            // const response=await axios.post("http://localhost:3000/product/create/review",obj,{
            //     withCredentials:true
            //   });
            return response;
        } catch (error) {
            throw error;
        }
    }

    return(
        <productContext.Provider value={{fetchProduct,fetchProductById,writeProductReview}}>
            {children}
        </productContext.Provider>
    )
}