export const errorHandler=function(res,statusCode,message,error){
    return res.status(statusCode).json({
        success:false,
        message:message,
        data:{},
        error:error
    })
}


// success handlers
export const successHandler=function(res,statusCode,message,data){
    return res.status(statusCode).json({
        success:true,
        message:message,
        data:data,
        error:{}
    })
}