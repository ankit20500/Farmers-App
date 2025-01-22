import { createUserService } from '../service/UserService.js';

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