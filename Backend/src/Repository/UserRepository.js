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
        const response=await User.findOne({email});
        return response;
    } catch (error) {
        throw error;
    }
}

// update user details
export const updateUserRepo=async(email,body)=>{
    try {
        console.log(body);
        const response=await User.findOneAndUpdate(
            {email},
            {$set:body},
            {new:true});
        return response;
    } catch (error) {
        throw error;
    }
}

// change user password
export const changePasswordRepo=async(email,password)=>{
    try {
        const response=await User.findOneAndUpdate(
            {email},
            {$set:{password:password}},
            {new:true}
        );
        return response;
    } catch (error) {
        throw error;
    }
}

// delete user
export const deleteUserRepo=async(id)=>{
    try {
        const response=await User.findByIdAndDelete(id);
        return response;
    } catch (error) {
        throw error;
    }
}