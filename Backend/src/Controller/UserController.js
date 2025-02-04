import { JWT_SECRET } from '../config/ServerConfig.js';
import { changePasswordService, createUserService, deleteUserService, updateUserService } from '../service/UserService.js';
import { errorHandler, successHandler } from '../Utility/Handler.js';
import jwt from 'jsonwebtoken';

// create profile
export const createUserController=async function(req,res){
    try {
        const response=await createUserService(req.body);
        // when user create profile successfully then make a token so that user don't have to login
        // if they refresh the page bcz after refresh we again fetch the data based on token
        const token=jwt.sign(
            {email:response.email,id:response._id},
            JWT_SECRET,
            {expiresIn:'72h'}
        )
        // store this token in cookies
        res.cookie('authToken',token,{
            httpOnly:true,
            secure:false,
            sameSite:"Lax",
            maxAge:72 * 60 * 60 * 1000
        })
        return res.status(200).json({
            status:true,
            message:'user register successfully',
            data:response,
            error:{}
        })
    } catch (error) {
        return res.status(500).json({
            status:false,
            data:{},
            message:error.message || error
        })
    }
}

// update profile
export const updateUserController=async function(req,res){
    try {
        const {email}=req.user;
        const response=await updateUserService(email,req.body);
        return successHandler(res,201,"profile update successfully",response);
    } catch (error) {
        return errorHandler(res,404,error.message,error);
    }
}

// change password
export const changePasswordController=async function(req,res){
    try {
        const {prevPassword,newPassword}=req.body;
        const {email}=req.user;
        const response=await changePasswordService(prevPassword,newPassword,email);
        return successHandler(res,200,"password change successfully",response);
    } catch (error) {
        return errorHandler(res,404,error.message,error);
    }
}

// delete user
export const deleteUserController=async function(req,res){
    try {
        const id=req.params.id;
        const response=await deleteUserService(id);
        res.clearCookie("authToken",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict"
        });
        return successHandler(res,200,"user delete successfully",response);
    } catch (error) {
        return errorHandler(res,404,error.message,error);
    }
}