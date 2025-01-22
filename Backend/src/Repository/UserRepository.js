// Database interaction logics

import { User } from "../Schema/User.js"

export const createUserRepo=async ({obj})=>{
    try {
        const response=await User.create({
            name:obj.name,
            email:obj.email,
            password:obj.password
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const findUser=async(email)=>{
    try {
        const response=await User.findOne({email:email});
        return response;
    } catch (error) {
        throw error;
    }
}