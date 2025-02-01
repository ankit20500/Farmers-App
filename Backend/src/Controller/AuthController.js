import { JWT_SECRET } from "../config/ServerConfig.js";
import { findUser } from "../Repository/UserRepository.js";
import { userLoginService, userLogoutService, } from "../service/AuthService.js";
import jwt from 'jsonwebtoken';

// login the user
export const userLoginController=async(req,res)=>{
    try {
        const payload=req.body;
        const response=await userLoginService(payload);

        // store this token in browser's cookie and this cookies is not seen anyone bcz it is httpOnly cookies
        res.cookie('authToken',response,{
            httpOnly:true,
            secure:false,
            maxAge:72 * 60 * 60 * 1000
        });
        
        // when token comes then according to token we return user details which is works as
        // when login then it shows profile
        const decode=jwt.verify(response,JWT_SECRET);
        const user=await findUser(decode.email);

        return res.status(200).json({
            success:true,
            message:'logged in successfully',
            data:user,
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