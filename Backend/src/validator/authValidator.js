import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/ServerConfig.js';

export const isLoggedIn=async(req,res,next)=>{
    const {authToken}=req.cookies;
    // if authToken is not found then we say that token will be expire
    if(!authToken){
        return res.status(401).json({
            success:false,
            data:{},
            error:"not authenticate",
            message:"auth token not provided"
        })
    }
    
    // now verify that this token will be valid
    const decode=jwt.verify(authToken,JWT_SECRET);
    if(!decode){
        return res.status(401).json({
            success:false,
            data:{},
            error:"not authenticate",
            message:"invalid token provided"
        })
    }

    // stores the user information in response section so that at any points when token will be their
    // then we can say that user will be valid and find their details with the help of this info..
    res.user={
        email:decode.email,
        id:decode.id
    }

    next();
}