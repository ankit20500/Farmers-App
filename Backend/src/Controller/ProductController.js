import { createProductService } from "../service/ProductService.js"

export const createProductController=async(req,res)=>{
    try {
        const response=await createProductService(req.body,res);
        return res.status(201).json({
            success:true,
            message:'product created successfully',
            data:response,
            error:{}
        })
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:error.message,
            data:{},
            error:error
        })
    }
}