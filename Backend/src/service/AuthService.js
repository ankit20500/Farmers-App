import { findUser } from "../Repository/UserRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/ServerConfig.js";


// login logics
export const userLoginService=async(payload, res)=>{
    const email=payload.email;
    const password=payload.password;
    // 1. check that if the user is exist or not with this password
    const user=await findUser(email);
    if(!user){
        throw {message:"this email is not registered",statusCode:404};
    }

    // 2. if email is exist then match the password
    const isPasswordValidawait=await bcrypt.compare(password,user.password);
    if(!isPasswordValidawait){
        throw {message:"password is wrong please try again",statusCode:401};
    }

    // 3. if email and password is same then make a token
    const token=jwt.sign(
        {email:user.email,id:user._id},
        JWT_SECRET,
        {expiresIn:'72h'}
    )
    
    // 4. store this token in browser's cookie and this cookies is not seen anyone bcz it is httpOnly cookies
    res.cookie('authToken',token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    return user;
}

// logout logics
export const userLogoutService=async(req)=>{
    const {authToken}=req.cookies;
    // check that any token will be their or not , and if their then remove or delete this token
    if(!authToken){
        throw{message:'user already logged out'};
    }
    return true;
}
