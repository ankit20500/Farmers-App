import { createCartRepo } from "../Repository/CartRepository.js";
import { changePasswordRepo, createUserRepo, deleteUserRepo, findUser, updateUserRepo } from "../Repository/UserRepository.js"
import bcrypt from 'bcrypt';

// create user profile
export const createUserService=async (body)=>{
        const {name, email, password,role}=body;
        const obj={name,email,password,role};

        // check that this email is already registered or not..
        const checkUser=await findUser(email);
        if(checkUser){
            throw{message:'this email address is already registered', statusCode:404}
        }
        // not registered then make a profile
        const response=await createUserRepo(obj);
        // make a unique cart for each user's
        await createCartRepo(response._id);
        return response;
}

// update user detils
export const updateUserService=async(email,body)=>{
    try {
        const response=await updateUserRepo(email,body);
        return response;
    } catch (error) {
        throw error;
    }
}

// change user password
export const changePasswordService=async(prevPassword,newPassword,email)=>{
    try {
        if(prevPassword==newPassword){
            throw{message:"Both the password is same"};
        }
        const user=await findUser(email);
        const prevpassword=await bcrypt.compare(prevPassword,user.password);
        if(!prevpassword){
            throw{message:"previous password is wrong"};
        }
        // before saving password, hash the new password
        const hashPassword=await bcrypt.hash(newPassword,10);
        const response=await changePasswordRepo(email,hashPassword);
        return response;
    } catch (error) {
        throw error;
    }
}

// delete user 
export const deleteUserService=async(id)=>{
    try {
        const response=await deleteUserRepo(id);
        return response;
    } catch (error) {
        throw error;
    }
}