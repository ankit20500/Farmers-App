import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const userContext=createContext();

export const UserProvider=({children})=>{
    const navigate=useNavigate();
    const [user,setUser]=useState(null);

    // register the user
    async function signupButton(obj){
        try {
            
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/user/create",obj,{
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
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/auth/profile",{},{
                withCredentials:true
            })
            setUser(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setUser(null);
            } else {
                console.error("Error for fetching user's data:", error);
            }
        }
    }
    // call the fetchUserData function to fetch the user's data;
    useEffect(()=>{
        fetchUserData();
    },[])

    // user login logic
    async function loginUser(userDetail){
        try {
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/auth/login",userDetail,{
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
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/auth/logout",{},{
                withCredentials:true
            })
            toast(response.data.message);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log("logout error",error);
            toast(error.response.data.message);
        }
    } 

    // user's password change
    async function changePassword(obj){
        try {
            const response=await axios.put("https://farmers-app-lxfi.onrender.com/user/password/update",obj,{
                withCredentials:true
            })
            return response
        } catch (error) {
            throw error;
        }
    }

    // update the user's profile
    async function updateUserProfile(obj){
        try {
            const response=await axios.put("https://farmers-app-lxfi.onrender.com/user/update",obj,{
                withCredentials:true
            })
            toast(response.data.message);
        } catch (error) {
            console.log(error);
            toast(error.response.data.message);
        }
    }

    // delete user
    async function deleteUser(id){
        try {
            const response=await axios.delete(`https://farmers-app-lxfi.onrender.com/user/delete/${id}`,{
                withCredentials:true
            });
            toast(response.data.message);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
            toast(error.response.data.message);
        }
    }



    return(
        <userContext.Provider value={{signupButton,loginUser,changePassword,updateUserProfile,UserLogout,deleteUser,user,setUser}}>
            {children}
        </userContext.Provider>
    )
}