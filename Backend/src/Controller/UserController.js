import { createUserService, updateUserService } from '../service/UserService.js';
import { errorHandler, successHandler } from '../Utility/Handler.js';

// create profile
export const createUserController=async function(req,res){
    try {
        const response=await createUserService(req.body);
        return res.status(200).json({
            status:true,
            message:'user register successfully',
            data:response,
            error:{}
        })
    } catch (error) {
        console.log("error comes",error);
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
        const {email}=res.user;
        const response=await updateUserService(email,req.body);
        return successHandler(res,201,"profile update successfully",response);
    } catch (error) {
        console.log(error);
        return errorHandler(res,404,error.message,error);
    }
}