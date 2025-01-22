import { userLoginService, userLogoutService } from "../service/AuthService.js";

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
        
        return res.status(200).json({
            success:true,
            message:'logged in successfully',
            data:{},
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
        console.log("error found")
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
