import { createUserRepo, findUser } from "../Repository/UserRepository.js"

export const createUserService=async (body)=>{
        const {name, email, password}=body;
        const obj={name,email,password};

        // check that this email is already registered or not..
        const checkUser=await findUser(email);
        if(checkUser){
            throw{message:'this email address is already registered', statusCode:404}
        }
        // not registered then make a profile
        const response=await createUserRepo({obj});
        return response;
}