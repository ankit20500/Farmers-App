// Database interaction logics

import { User } from "../Schema/User.js"

// create user profile
export const createUserRepo=async (obj)=>{
    try {
        const response=await User.create({
            name:obj.name,
            email:obj.email,
            password:obj.password,
            role:obj.role? obj.role:"user"

        });
        return response;
    } catch (error) {
        throw error;
    }
}

// find user details
export const findUser=async(email)=>{
    try {
        const response=await User.findOne({email:email});
        return response;
    } catch (error) {
        throw error;
    }
}

// update user details
export const updateUserRepo=async(email,body)=>{
    try {
        const response=await User.findOneAndUpdate(
            {email},
            {$set:body},
            {new:true});
        return response;
    } catch (error) {
        throw error;
    }
}