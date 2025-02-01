import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const contextProvider=createContext();

function ContextApi({children}){
    const [user,setUser]=useState(null);

    // register the user
    async function signupButton(obj){
        try {
            console.log(obj);
            const response=await axios.post("http://localhost:3000/user/create",obj,{
                withCredentials:true
            })
            setUser(response.data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // function for fetch the user data on page refresh
    async function fetchUserData(){
        try {
            const response=await axios.post("http://localhost:3000/auth/profile",{},{
                withCredentials:true
            })
            setUser(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setUser(null);
            } else {
                console.error("Error fetching user data:", error);
            }
        }
    }
    // call the fetchUserData function to fetch the user's data;
    useEffect(()=>{
        fetchUserData();
    },[user])

    // user login logic
    async function loginUser(userDetail){
        try {
            const response=await axios.post("http://localhost:3000/auth/login",userDetail,{
                withCredentials:true
            })
            return response;
        } catch (error) {
            toast(error.response.data.message);
        }

    }

    // user logout logics
    async function UserLogout(){
        try {
            const response=await axios.post("http://localhost:3000/auth/logout",{},{
                withCredentials:true
            })
            toast(response.data.message);
            setUser(null);
        } catch (error) {
            console.log("logout error",error);
            toast(error.response.data.message);
        }
    } 

    // user's password change
    async function changePassword(obj){
        try {
            const response=await axios.put("http://localhost:3000/user/password/update",obj,{
                withCredentials:true
            })
            return response
        } catch (error) {
            throw error;
        }
    }

    // delete user
    async function deleteUser(id){
        try {
            const response=await axios.delete(`http://localhost:3000/user/delete/${id}`,{
                withCredentials:true
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
    // fetch the product's data with category and subCategory
    async function fetchProduct(category,subCategory){
        try{
            const response=await axios.get(`http://localhost:3000/product/products?category=${category}&subcategory=${subCategory}`,{},{
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
            const response=await axios.get(`http://localhost:3000/product/details/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    return(
        <contextProvider.Provider value={{signupButton, fetchProductById,fetchProduct,deleteUser,changePassword,UserLogout,user,setUser,loginUser}}>
            {children}
        </contextProvider.Provider>
    )
}

export {ContextApi,contextProvider};