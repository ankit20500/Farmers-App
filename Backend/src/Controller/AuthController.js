import { findUser } from "../Repository/UserRepository.js";
import { userLoginService, userLogoutService, } from "../service/AuthService.js";

// login the user
export const userLoginController=async(req,res)=>{
    try {
        const payload=req.body;
        const response=await userLoginService(payload,res);

        return res.status(200).json({
            success:true,
            message:'logged in successfully',
            data:response,
            error:{}
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        })
    }
}

// logout the user
export const userLogoutController=async(req,res)=>{
    try {
        await userLogoutService(req);
        res.clearCookie("authToken",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict"
        });

        return res.status(200).json({
            success:true,
            message:"user logged out successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

// find profile
export const userProfileController=async(req,res)=>{
    try {
        const {email}=req.user;
        const response=await findUser(email);
        res.status(200).json({
            success:true,
            data:response
        })
    } catch (error) {
        res.status(404).json({
            success:false,
            error:error.message
        })
    }
}