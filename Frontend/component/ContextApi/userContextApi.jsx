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
            // for production related request
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/user/create",obj,{
                withCredentials:true
            })

            // for localhost related request
            // const response=await axios.post("http://localhost:3000/user/create",obj,{
            //     withCredentials:true
            // })
            setUser(response.data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // function for fetch the user data on page refresh
    async function fetchUserData(){
        try {
            // for production related request
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/auth/profile",{},{
                withCredentials:true
            })

            // for localhost related request
            // const response=await axios.post("http://localhost:3000/auth/profile",{},{
            //     withCredentials:true
            // })
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
            // for production related request
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/auth/login",userDetail,{
                withCredentials:true
            })

            // for localhost related request
            // const response=await axios.post("http://localhost:3000/auth/login",userDetail,{
            //     withCredentials:true
            // })
            return response;
        } catch (error) {
            toast(error.response.data.message);
        }

    }

    // user logout logics
    async function UserLogout(){
        try {
            // for production related request
            const response=await axios.post("https://farmers-app-lxfi.onrender.com/auth/logout",{},{
                withCredentials:true
            })

            // for localhost related request
            // const response=await axios.post("http://localhost:3000/auth/logout",{},{
            //     withCredentials:true
            // })
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
            // for production related request
            const response=await axios.put("https://farmers-app-lxfi.onrender.com/user/password/update",obj,{
                withCredentials:true
            })

            // for localhost related request
            // const response=await axios.put("http://localhost:3000/user/password/update",obj,{
            //     withCredentials:true
            // })
            return response
        } catch (error) {
            throw error;
        }
    }

    // update the user's profile
    async function updateUserProfile(obj){
        try {
            // for production related request
            const response=await axios.put("https://farmers-app-lxfi.onrender.com/user/update",obj,{
                withCredentials:true
            })

            // for localhost related request
            // const response=await axios.put("http://localhost:3000/user/update",obj,{
            //     withCredentials:true
            // })
            toast(response.data.message);
        } catch (error) {
            console.log(error);
            toast(error.response.data.message);
        }
    }

    // delete user
    async function deleteUser(id){
        try {
            // for production related request
            const response=await axios.delete(`https://farmers-app-lxfi.onrender.com/user/delete/${id}`,{
                withCredentials:true
            });

            // for localhost related request
            // const response=await axios.delete(`http://localhost:3000/user/delete/${id}`,{
            //     withCredentials:true
            // });
            toast(response.data.message);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
            toast(error.response.data.message);
        }
    }

    // finds user's profile by id
    async function findUsersProfile(id) {
        try {
            // for production
            const user=await axios.get(`https://farmers-app-lxfi.onrender.com/user/profile/${id}`,{
                withCredentials:true
            })

            // const user=await axios.get(`http://localhost:3000/user/profile/${id}`,{
            //     withCredentials:true
            // })
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <userContext.Provider value={{signupButton,loginUser,changePassword,updateUserProfile,UserLogout,deleteUser,user,setUser,findUsersProfile}}>
            {children}
        </userContext.Provider>
    )
}