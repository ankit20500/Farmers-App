import { createUserRepo, findUser, updateUserRepo } from "../Repository/UserRepository.js"

// create user profile
export const createUserService=async (body)=>{
        const {name, email, password,role}=body;
        const obj={name,email,password,role};

        // check that this email is already registered or not..
        const checkUser=await findUser(email);
        if(checkUser){
            throw{message:'this email address is already registered', statusCode:404}
        }
        // not registered then make a profile
        const response=await createUserRepo(obj);
        return response;
}

// update user detils
export const updateUserService=async(email,body)=>{
    try {
        const response=await updateUserRepo(email,body);
        return response;
    } catch (error) {
        throw error;
    }
}